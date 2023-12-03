// api/attendingworkshops.js
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
  console.log("api/attendingworkshops memberID: ", memberID);

  try {
    const connection = await pool.getConnection();

    // Execute the query to fetch workshops attended by the user
    const [rows] = await connection.execute(
      `
      SELECT workshops.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM workshops
      JOIN shelters ON workshops.WS_FK = shelters.shelterID
      JOIN attendworkshop ON workshops.workshopID = attendworkshop.workshopFK
      WHERE attendworkshop.memberFK = ?
      `,
      [memberID]
    );

    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching attending workshops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
