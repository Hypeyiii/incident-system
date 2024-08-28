import { queryDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { randomUUID } from "crypto";

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  department_id: number;
  rol_id: number;
}

export async function POST(req: NextRequest) {
  const { email, password, name, department } = await req.json();
  const id = randomUUID();

  if (!email || !password || !name || !department) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  try {
    const [existingUserRows] = (await queryDatabase(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    )) as [User[] | undefined];

    if (existingUserRows) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultRoleId = 1;

    const result = (await queryDatabase(
      `INSERT INTO users (id, email, password, name, department_id, rol_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, email, hashedPassword, name, department, defaultRoleId]
    )) as { affectedRows: number };

    if (result.affectedRows === 1) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          id,
          email,
          name,
          rol: defaultRoleId,
        },
        "secret-json-web-token"
      );

      const serializedToken = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60, // 1 hora
        path: "/",
      });

      const response = NextResponse.json({
        success: true,
        message: "Usuario registrado exitosamente",
        user: {
          id,
          email,
          name,
          department_id: department,
          rol_id: defaultRoleId,
        },
      });
      response.headers.set("Set-Cookie", serializedToken);

      return response;
    } else {
      return NextResponse.json(
        { error: "Error al registrar el usuario" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Error registering user:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
