// Inside api/add-to-cart.js

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
  if (req.method === "POST") {
    const { cartId, itemId, quantity } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO cartitems (cartFK, itemFK, item_quantity) VALUES ($1, $2, &3) RETURNING *",
        [cartId, itemId, quantity]
      );

      // Return the newly added item if needed
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
