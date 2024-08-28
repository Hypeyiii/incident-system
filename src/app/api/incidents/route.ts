import { NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db";

export async function GET() {
  try {
    const query = `
    SELECT
        i.id,
        i.title,
        i.description,
        i.status,
        i.priority,
        i.reported_by,
        reported.name AS reported_by_name,
        i.category,
        i.department,
        i.severity,
        i.due_date,
        i.assigned_to,
        assigned.name AS assigned_to_name,
        i.created_at,
        i.updated_at,
        i.closed_info
    FROM
        incidents i
    JOIN
        users reported
    ON
        i.reported_by = reported.id
    LEFT JOIN
        users assigned
    ON
        i.assigned_to = assigned.id;
    `;
    const rows = await queryDatabase(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      {
        error: "Error fetching incidents",
      },
      { status: 500 }
    );
  }
}
