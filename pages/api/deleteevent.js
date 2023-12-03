// pages/api/deleteevent.js
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
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, shelter } = req.body;

    const connection = await pool.getConnection();
    console.log("Result received: ", req.body);

    // Check if the event exists based on name and shelter
    const [existingRows] = await connection.execute(
      "SELECT * FROM events WHERE name = ? AND ES_FK = ?",
      [name, shelter]
    );

    if (existingRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Event not found" });
    }

    // If the event exists, delete it
    const [result] = await connection.execute(
      "DELETE FROM events WHERE name = ? AND ES_FK = ?",
      [name, shelter]
    );

    console.log(`Deleted ${result.affectedRows} row(s): `, result);

    connection.release();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
