// pages/api/purchase.js
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
  try {
    // Get user information from the request (assuming you have user authentication)
    const userID = req.body;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Clear the entire shopping cart for the user
    await connection.execute("DELETE FROM cartitems WHERE cartFK = ?", [
      userID,
    ]);

    // Release the connection back to the pool
    connection.release();

    res.status(200).json({ message: "Purchase successful. Cart cleared." });
  } catch (error) {
    console.error("Error making a purchase:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
