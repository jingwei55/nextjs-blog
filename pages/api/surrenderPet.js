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

  const { petName, petType, petAge, description, shelter } = req.body;

  try {
    const connection = await pool.getConnection();
    console.log("Result received: ", req.body);
    console.log("shelter:", shelter);
    console.log("Type of shelter:", typeof shelter);
    // Insert the surrendered pet into the database
    const [result] = await connection.execute(
      "INSERT INTO pets (name, pet_type, age, `desc`, PS_FK) VALUES (?, ?, ?, ?, ?)",
      [petName, petType, petAge, description, shelter]
    );

    connection.release();

    res.status(200).json({
      message: "Pet surrendered successfully",
      petId: result.insertId,
    });
  } catch (error) {
    console.error("Error surrendering pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
