import { queryDatabase } from "./db";

export async function getIncidents() {
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
  return queryDatabase(query);
}

export async function getIncidentData() {
  const query = `
    SELECT 
      DATE_FORMAT(due_date, '%Y-%m-%d') AS time, 
      COUNT(*) AS value 
    FROM incidents
    GROUP BY DATE_FORMAT(due_date, '%Y-%m-%d')
    ORDER BY time ASC;
  `;
  return queryDatabase(query);
}

export async function getResolvedIncidentData() {
  const query = `
    SELECT 
      DATE_FORMAT(updated_at, '%Y-%m-%d') AS time, 
      COUNT(*) AS value 
    FROM incidents
    WHERE status = 'resolved'
    GROUP BY DATE_FORMAT(updated_at, '%Y-%m-%d')
    ORDER BY time ASC;
  `;
  return queryDatabase(query);
}

export async function getAssignedIncidentData() {
  const query = `
    SELECT 
      DATE(updated_at) AS time, 
      COUNT(*) AS value 
    FROM incidents 
    WHERE assigned_to IS NOT NULL
    GROUP BY DATE(updated_at)
    ORDER BY time ASC;
  `;
  return queryDatabase(query);
}

export async function getOpenIncidents() {
  const query = `
    SELECT 
      DATE_FORMAT(updated_at, '%Y-%m-%d') AS time, 
      COUNT(*) AS value 
    FROM incidents
    WHERE status = 'open'
    GROUP BY DATE_FORMAT(updated_at, '%Y-%m-%d')
    ORDER BY time ASC;
  `;
  return queryDatabase(query);
}

export async function getDepartmentData() {
  const query = `
    SELECT 
      department_id AS id, 
      COUNT(*) AS value 
    FROM incidents
    GROUP BY department_id;
  `;
  return queryDatabase(query);
}

// export async function verifyToken(req: NextRequest) {
//   const tokenCookie = req.cookies.get("token");
//   const jwt = tokenCookie ? tokenCookie.value : undefined;

//   if (jwt === undefined) {
//     return { success: false };
//   }
//   try {
//     const { payload } = await jwtVerify(
//       jwt,
//       new TextEncoder().encode("secret-json-web-token")
//     );
//     return { success: true, payload };
//   } catch (err) {
//     console.error("JWT verification error:", err);
//     return { success: false };
//   }
// }

export async function getUsers() {
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

  return queryDatabase(query);
}

export async function getUserByEmail(email: string) {
  const query = `SELECT * FROM users WHERE email = ?`;
  return queryDatabase(query, [email]);
}

export async function getUserById(id: string) {
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
        rols r ON u.rol_id = r.id
        WHERE u.id = ?;
    `;
  return queryDatabase(query, [id]);
}

export async function getIncidentById(id: number) {
  const query = `
    SELECT
        i.id,
        i.title,
        i.description,
        i.status,
        i.priority,
        i.reported_by,
        u.name AS reported_by_name,
        i.category,
        i.department,
        i.severity,
        i.due_date,
        i.assigned_to,
        i.created_at,
        i.updated_at,
        i.closed_info
    FROM
        incidents i
    JOIN
        users u
    ON
        i.reported_by = u.id
    WHERE i.id = ?;
  `;
  return queryDatabase(query, [id]);
}
