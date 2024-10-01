import { queryDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  rol_id: number;
  department_id: number;
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = (await queryDatabase(query, [email])) as [User | undefined];
    const user = rows;

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Crear el token JWT
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            id: user.id,
            email: user.email,
            name: user.name,
            rol_id: user.rol_id,
            department_id: user.department_id,
          },
          "secret-json-web-token"
        );

        // Serializa la cookie del token
        const serializedToken = serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60,
          path: "/",
        });

        const response = NextResponse.json({
          success: true,
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            rol_id: user.rol_id,
            department_id: user.department_id,
          },
        });
        response.headers.set("Set-Cookie", serializedToken);

        return response;
      } else {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Error logging in:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
