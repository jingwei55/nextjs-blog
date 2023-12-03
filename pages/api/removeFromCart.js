// pages/api/removeFromCart.js
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

    console.log("Data received: ", res.body);
    // Get itemID and quantity from the request body
    const { userID, itemID, quantity } = req.body;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Retrieve the current quantity of the item in the cart
    const [currentQuantityRows] = await connection.execute(
      "SELECT item_quantity FROM cartitems WHERE cartFK = ? AND itemFK = ?",
      [userID, itemID]
    );

    // If the item is not in the cart or the requested quantity is greater than the current quantity, return an error
    if (
      currentQuantityRows.length === 0 ||
      quantity > currentQuantityRows[0].item_quantity
    ) {
      connection.release();
      return res.status(400).json({ error: "Invalid quantity to remove" });
    }

    // Update the cart item quantity
    await connection.execute(
      "UPDATE cartitems SET item_quantity = item_quantity - ? WHERE cartFK = ? AND itemFK = ?",
      [quantity, userID, itemID]
    );

    // If the quantity becomes zero, remove the item from the cart
    await connection.execute(
      "DELETE FROM cartitems WHERE cartFK = ? AND itemFK = ? AND item_quantity = 0",
      [userID, itemID]
    );

    // Update the quantity in the items table
    await connection.execute(
      "UPDATE items SET quantity = quantity + ? WHERE itemID = ?",
      [quantity, itemID]
    );

    // Release the connection back to the pool
    connection.release();

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
