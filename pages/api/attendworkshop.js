// api/attendworkshop.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "adoptionwebsite", // Replace with your actual database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { memberID, workshopID } = req.body;
  console.log("api/attendworkshop memberID: ", memberID);

  try {
    const connection = await pool.getConnection();

    // Insert a new record into the attendworkshop table to link the memberID with the workshopID
    await connection.execute(
      `
      INSERT INTO attendworkshop (workshopFK, memberFK)
      VALUES (?, ?)
      `,
      [workshopID, memberID]
    );

    connection.release();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error attending workshop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
