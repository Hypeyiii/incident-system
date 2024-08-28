import { queryDatabase } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { rol_id } = await req.json();
    const query = "UPDATE users SET rol_id= ? WHERE id = ?";
    const result = await queryDatabase(query, [rol_id, id]);

    return {
      status: 200,
      body: { message: "Incidencia asignada con éxito" },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { error: "Hubo un error al asignar la incidencia" },
    };
  }
}
