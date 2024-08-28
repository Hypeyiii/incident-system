import { queryDatabase } from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();

  const {
    title,
    description,
    priority,
    reported_by,
    category,
    department,
    severity,
  } = data;

  const query = `
    INSERT INTO incidents (title, description, status, priority, reported_by, category, department, severity, due_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    title,
    description,
    'open',
    priority,
    reported_by,
    category,
    department,
    severity,
    new Date(),
  ];

  try {
    await queryDatabase(query, values);
    return new Response(
      JSON.stringify({ message: "Incidencia creada con éxito" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error creando la incidencia" }),
      { status: 500 }
    );
  }
}
