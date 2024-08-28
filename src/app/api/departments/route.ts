import { NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db";

export async function GET() {
  try {
    const query = "SELECT * FROM departments";
    const rows = await queryDatabase(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      {
        error: "Error fetching departments",
      },
      { status: 500 }
    );
  }
}
