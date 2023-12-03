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
    const { userID, itemId, quantity } = req.body;
    console.log("Body data: ", req.body);

    try {
      const updateResult = await pool.query(
        `
        UPDATE cartitems
        SET item_quantity = item_quantity + ?
        WHERE cartFK = ? AND itemFK = ?
        `,
        [quantity, userID, itemId]
      );

      if (updateResult.affectedRows === 0) {
        // If no rows were updated, it means the combination doesn't exist, so insert a new row
        const insertResult = await pool.query(
          `
          INSERT INTO cartitems (cartFK, itemFK, item_quantity)
          VALUES (?, ?, ?)
          `,
          [userID, itemId, quantity]
        );
      }

      // Fetch the updated or newly inserted row
      const selectResult = await pool.query(
        `
        SELECT * FROM cartitems
        WHERE cartFK = ? AND itemFK = ?
        `,
        [userID, itemId]
      );

      // Return the result
      res.status(200).json(selectResult[0]);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
