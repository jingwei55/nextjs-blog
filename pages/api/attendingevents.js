// api/attendingevents.js
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
  console.log("api/attendingevents memberID: ", memberID);

  try {
    const connection = await pool.getConnection();

    // Execute the query to fetch events attended by the user
    const [rows] = await connection.execute(
      `
      SELECT events.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM events
      JOIN shelters ON events.ES_FK = shelters.shelterID
      JOIN attendevent ON events.eventID = attendevent.eventFK
      WHERE attendevent.memberFK = ?
      `,
      [memberID]
    );

    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching attending events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
