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
  const { memberID } = req.query;
  console.log("api/workshop memberID: ", memberID);
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [rows] = await connection.execute(
      `
    SELECT workshops.*, shelters.location AS shelter_location, shelters.name AS shelter_name
    FROM workshops
    JOIN shelters ON workshops.WS_FK = shelters.shelterID
    LEFT JOIN attendworkshop ON workshops.workshopID = attendworkshop.workshopFK AND attendworkshop.memberFK = ?
    WHERE attendworkshop.workshopFK IS NULL
    `,
      [memberID]
    );

    // Release the connection back to the pool
    connection.release();

    console.log("api/workshop data: ", rows);

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching workshops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
