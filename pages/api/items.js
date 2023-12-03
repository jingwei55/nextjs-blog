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

export default async function handler(_, res) {
  try {
    const connection = await pool.getConnection();

    // Execute the query to fetch shelter names
    const [rows] = await connection.execute(
      "SELECT itemID, name, price, item_type, quantity FROM items"
    );

    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
