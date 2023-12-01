// pages/api/shelter/[shelterID].js
import mysql from "mysql2/promise";

// Configure your MySQL connection
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
  const { shelterID } = req.query;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [rows] = await connection.execute(
      "SELECT * FROM shelters WHERE shelterID = ?",
      [shelterID]
    );

    // Release the connection back to the pool
    connection.release();

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching shelter details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
