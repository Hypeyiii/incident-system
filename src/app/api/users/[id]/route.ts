import { queryDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { rol_id } = await req.json();
    const query = "UPDATE users SET rol_id = ? WHERE id = ?";
    const result = await queryDatabase(query, [rol_id, id]);

    return NextResponse.json(
      { message: "Rol actualizado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Hubo un error al actualizar el rol" },
      { status: 500 }
    );
  }
}
