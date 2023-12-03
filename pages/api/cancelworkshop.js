// api/cancelattendance.js
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

  const { memberID, workshopID } = req.body;

  try {
    const connection = await pool.getConnection();

    try {
      // Begin a transaction to ensure atomicity
      await connection.beginTransaction();

      // Update the attendance status for the specified workshop
      await connection.execute(
        `
        DELETE FROM attendworkshop
        WHERE workshopFK = ?
        AND memberFK = ?
        `,
        [workshopID, memberID]
      );

      // Commit the transaction if everything is successful
      await connection.commit();

      connection.release();

      res.status(200).json({ success: true });
    } catch (error) {
      // Rollback the transaction in case of any error
      await connection.rollback();

      throw error; // Re-throw the error for the outer catch block
    }
  } catch (error) {
    console.error("Error canceling attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
