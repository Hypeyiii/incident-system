import { NextRequest, NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { closed_info, assigned_to } = await req.json();

  if (!id || closed_info === undefined) {
    return NextResponse.json(
      { error: "ID y closed_info son requeridos" },
      { status: 400 }
    );
  }

  try {
    const query =
      "UPDATE incidents SET status = ?, closed_info = ? WHERE id = ?";
    const result = await queryDatabase(query, [
      "resolved",
      closed_info,
      id,
    ]);

    if ((result as ResultSetHeader).affectedRows > 0) {
      return NextResponse.json(
        { message: "Incidencia cerrada con éxito" },
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
      { error: "Hubo un error al cerrar la incidencia" },
      { status: 500 }
    );
  }
}
