// api/adoptedpets.js
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
  const { memberID } = req.query;

  try {
    const connection = await pool.getConnection();

    // Fetch adopted pets data from the adoptions table based on memberID
    const [rows] = await connection.execute(
      `
      SELECT pets.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM pets
      JOIN shelters ON pets.PS_FK = shelters.shelterID
      WHERE pets.PM_FK = ?
    `,
      [memberID]
    );

    connection.release();

    console.log("api/adoptedpets Data: ", rows);

    // Respond with the adopted pets data
    res.status(200).json({
      adoptedPets: rows,
    });
  } catch (error) {
    console.error("Error fetching adopted pets data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
