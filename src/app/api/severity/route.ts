import { NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db";

export async function GET() {
  try {
    const query = "SELECT * FROM severity_levels";
    const rows = await queryDatabase(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching severity_levels:", error);
    return NextResponse.json(
      {
        error: "Error fetching severity_levels",
      },
      { status: 500 }
    );
  }
}
