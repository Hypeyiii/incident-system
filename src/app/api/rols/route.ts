import { NextResponse } from "next/server";
import { queryDatabase } from "@/lib/db";

export async function GET() {
  try {
    const query = "SELECT * FROM rols";
    const rows = await queryDatabase(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching rols:", error);
    return NextResponse.json(
      {
        error: "Error fetching rols",
      },
      { status: 500 }
    );
  }
}
