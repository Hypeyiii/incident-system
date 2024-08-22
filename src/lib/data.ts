import { connection } from "./db";

export async function getProducts() {
  const query = `SELECT * FROM incidents`;

  return connection(query, []);
}
