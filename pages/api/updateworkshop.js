// pages/api/surrenderPet.js
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
  let result;
  try {
    const { name, desc, date, shelter } = req.body;
    const formattedDate = new Date(date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const connection = await pool.getConnection();
    console.log("Result received: ", req.body);

    // Check if a duplicate entry exists based on both name and shelter
    const [existingRows] = await connection.execute(
      "SELECT * FROM workshops WHERE name = ? AND WS_FK = ?",
      [name, shelter]
    );

    console.log("Finding duplicates in same shelter: ", existingRows);

    if (existingRows.length > 0) {
      // If a duplicate entry exists, update the existing row
      [result] = await connection.execute(
        `
          UPDATE workshops
          SET
            \`desc\` = ?,
            date = ?
          WHERE
            name = ? AND WS_FK = ?
          `,
        [name, desc, formattedDate, shelter]
      );
      console.log(`Updated ${result.affectedRows} rows: `, result);
    } else {
      // If no duplicate entry exists, insert a new row
      [result] = await connection.execute(
        "INSERT INTO workshops (name, `desc`, date, WS_FK) VALUES (?, ?, ?, ?)",
        [name, desc, formattedDate, shelter]
      );
      console.log(`Inserted ${result.affectedRows} row: `, result);
    }

    connection.release();
    res.status(200).json({
      message: "workshop added successfully",
      petId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding workshop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
