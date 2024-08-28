import { NextRequest, NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { assigned_to } = await req.json();

  if (!id || !assigned_to) {
    return NextResponse.json(
      { error: "ID y assigned_to son requeridos" },
      { status: 400 }
    );
  }

  try {
    const query = "UPDATE incidents SET assigned_to = ? WHERE id = ?";
    const result = await queryDatabase(query, [assigned_to, id]);

    if ((result as ResultSetHeader).affectedRows > 0) {
      return NextResponse.json(
        { message: "Incidencia asignada con éxito" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Incidencia no encontrada" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Hubo un error al asignar la incidencia" },
      { status: 500 }
    );
  }
}
