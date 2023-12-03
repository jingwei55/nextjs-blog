// api/surrender.js
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

    try {
      // Update the PM_FK column in the pets table to surrender the pet
      await connection.execute(
        `
        UPDATE pets
        SET PM_FK = NULL
        WHERE petID = ?
        AND PM_FK = ?
        `,
        [petID, memberID]
      );

      connection.release();

      res.status(200).json({ success: true });
    } catch (error) {
      // Rollback the transaction in case of any error
      await connection.rollback();

      throw error; // Re-throw the error for the outer catch block
    }
  } catch (error) {
    console.error("Error surrendering pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
