// pages/api/removeFromCart.js
import query from "../../lib/query";

export default async function handler(req, res) {
  try {
    // Get itemID and quantity from the request body
    const { userID, itemID, quantity } = req.body;

    // console.log("Data received: ", req.body);

    // Retrieve the current quantity of the item in the cart
    const [currentQuantityRows] = await query(
      "SELECT item_quantity FROM cartitems WHERE cartFK = ? AND itemFK = ?",
      [userID, itemID]
    );

    // console.log("current Quantity", currentQuantityRows);

    // If the item is not in the cart or the requested quantity is greater than the current quantity, return an error
    if (!currentQuantityRows || quantity > currentQuantityRows.item_quantity) {
      return res.status(400).json({ error: "Invalid quantity to remove" });
    }

    // Update the cart item quantity
    await query(
      "UPDATE cartitems SET item_quantity = item_quantity - ? WHERE cartFK = ? AND itemFK = ?",
      [quantity, userID, itemID]
    );

    // If the quantity becomes zero, remove the item from the cart
    await query(
      "DELETE FROM cartitems WHERE cartFK = ? AND itemFK = ? AND item_quantity = 0",
      [userID, itemID]
    );

    // Update the quantity in the items table
    await query("UPDATE items SET quantity = quantity + ? WHERE itemID = ?", [
      quantity,
      itemID,
    ]);

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
