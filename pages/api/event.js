// pages/api/pets.js
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
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [rows] = await connection.execute(`
      SELECT events.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM events
      JOIN shelters ON events.ES_FK = shelters.shelterID
    `);

    // Release the connection back to the pool
    connection.release();

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
