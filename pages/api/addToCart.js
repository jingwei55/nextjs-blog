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
      await pool.query("BEGIN"); // Start a transaction

      const updateItemResult = await pool.query(
        `
        UPDATE items
        SET quantity = quantity - ?
        WHERE itemID = ?
        `,
        [quantity, itemId]
      );

      console.log("item table updated (reduce quantity)");

      if (updateItemResult.affectedRows === 0) {
        // If no rows were updated, handle the case where the item doesn't exist
        await pool.query("ROLLBACK"); // Rollback the transaction
        console.log("Item not found.");
        return res.status(404).json({ error: "Item not found." });
      }

      const updateCartResult = await pool.query(
        `
        UPDATE cartitems
        SET item_quantity = item_quantity + ?
        WHERE cartFK = ? AND itemFK = ?
        `,
        [quantity, userID, itemId]
      );

      console.log("Attempted to update existing quantity");
      // console.log("updated Cart result:", updateCartResult[0]);
      // console.log("Check affected rows: ", updateCartResult[0].affectedRows);

      if (updateCartResult[0].affectedRows === 0) {
        // If no rows were updated, it means the combination doesn't exist, so insert a new row
        const insertCartResult = await pool.query(
          `
          INSERT INTO cartitems (cartFK, itemFK, item_quantity)
          VALUES (?, ?, ?)
          `,
          [userID, itemId, quantity]
        );

        console.log("New entry in cartitems since no existing row");

        if (insertCartResult.affectedRows === 0) {
          // If no rows were inserted, handle the failure
          await pool.query("ROLLBACK"); // Rollback the transaction
          console.log("Failed to add item to cart.");
          return res.status(500).json({ error: "Failed to add item to cart." });
        }
      }

      await pool.query("COMMIT"); // Commit the transaction

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
      await pool.query("ROLLBACK"); // Rollback the transaction in case of an error
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
