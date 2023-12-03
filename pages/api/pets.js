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
    // const [rows] = await connection.execute("SELECT * FROM pets");
    const [rows] = await connection.execute(`
      SELECT pets.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM pets
      JOIN shelters ON pets.PS_FK = shelters.shelterID
    `);

    // Release the connection back to the pool
    connection.release();

    console.log("Pet Data: ", rows);

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
