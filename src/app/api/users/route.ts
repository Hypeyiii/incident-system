import { NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT
        u.id,
        u.name,
        u.email,
        d.name AS department_name,
        r.name AS role_name
      FROM
        users u
      JOIN
        departments d ON u.department_id = d.id
      JOIN
        rols r ON u.rol_id = r.id;
    `;
    const rows = await queryDatabase(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      {
        error: "Error fetching accounts",
      },
      { status: 500 }
    );
  }
}
