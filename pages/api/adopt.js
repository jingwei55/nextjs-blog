// api/adopt.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "adoptionwebsite",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { memberID, petID } = req.body;

  try {
    const connection = await pool.getConnection();

    // Insert a new record into the adoptions table to link the memberID with the petID
    await connection.execute(
      `
      UPDATE pets
      SET PM_FK = ?
      WHERE petID = ?
      `,
      [memberID, petID]
    );

    connection.release();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adopting pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
