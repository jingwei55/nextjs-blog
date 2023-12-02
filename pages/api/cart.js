// // pages/api/cart.js
// export default function handler(req, res) {
//   if (req.method === "GET") {
//     // Hardcoded cart data
//     const cartData = {
//       totalCost: 25.98,
//       totalItems: 3,
//       items: [
//         {
//           itemID: 1,
//           quantity: 2,
//           item: {
//             name: "Pet Food",
//             price: 15.99,
//           },
//         },
//         {
//           itemID: 2,
//           quantity: 1,
//           item: {
//             name: "Pet Toy",
//             price: 9.99,
//           },
//         },
//       ],
//     };

//     res.status(200).json(cartData);
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }

// pages/api/cart.js

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

async function handler(req, res) {
  const { method, body, query } = req;

  try {
    const connection = await pool.getConnection();

    if (method === "GET") {
      const { memberID } = query;
      const [rows] = await connection.execute(
        // "SELECT cart.cartID, cart.totalCost, cart.totalItems, items.name, items.price, cartitems.quantity FROM cartitems JOIN items ON cartitems.itemID = items.itemID JOIN cart ON cartitems.cartID = cart.cartID WHERE cart.memberFK = ?",
        "SELECT cartitems.itemFK, cartitems.item_quantity FROM cartitems WHERE cartitems.cartFK = ?"[
          memberID
        ]
      );

      // Calculate totalCost and totalItems
      const totalCost = rows.reduce(
        (acc, row) => acc + row.quantity * row.price,
        0
      );
      const totalItems = rows.reduce((acc, row) => acc + row.quantity, 0);

      // Update cart table with new values
      await connection.execute(
        "UPDATE cart SET totalCost = ?, totalItems = ? WHERE cartID = ?",
        [totalCost, totalItems, rows[0].cartID]
      );

      res.status(200).json({ totalCost, totalItems, items: rows });
    } else if (method === "POST") {
      const { memberID, itemID, quantity } = body;
      // Assuming cartID is obtained by some means (maybe a previous API call)
      const [cartResult] = await connection.execute(
        "SELECT * FROM cart WHERE memberFK = ?",
        [memberID]
      );
      const cartID = cartResult[0].cartID;

      await connection.execute(
        "INSERT INTO cartitems (cartID, itemID, quantity) VALUES (?, ?, ?)",
        [cartID, itemID, quantity]
      );

      // Calculate totalCost and totalItems after the insertion
      const [updatedRows] = await connection.execute(
        "SELECT cart.cartID, cart.totalCost, cart.totalItems, items.name, items.price, cartitems.quantity FROM cartitems JOIN items ON cartitems.itemID = items.itemID JOIN cart ON cartitems.cartID = cart.cartID WHERE cart.cartID = ?",
        [cartID]
      );

      // Update cart table with new values
      const updatedTotalCost = updatedRows.reduce(
        (acc, row) => acc + row.quantity * row.price,
        0
      );
      const updatedTotalItems = updatedRows.reduce(
        (acc, row) => acc + row.quantity,
        0
      );

      await connection.execute(
        "UPDATE cart SET totalCost = ?, totalItems = ? WHERE cartID = ?",
        [updatedTotalCost, updatedTotalItems, cartID]
      );

      res.status(201).json({ message: "Item added to the cart successfully" });
    } else if (method === "DELETE") {
      const { itemID } = query;
      await connection.execute("DELETE FROM cartitems WHERE itemID = ?", [
        itemID,
      ]);

      // Calculate totalCost and totalItems after the deletion
      const [updatedRows] = await connection.execute(
        "SELECT cart.cartID, cart.totalCost, cart.totalItems, items.name, items.price, cartitems.quantity FROM cartitems JOIN items ON cartitems.itemID = items.itemID JOIN cart ON cartitems.cartID = cart.cartID WHERE cart.memberFK = ?",
        [memberID]
      );

      const updatedTotalCost = updatedRows.reduce(
        (acc, row) => acc + row.quantity * row.price,
        0
      );
      const updatedTotalItems = updatedRows.reduce(
        (acc, row) => acc + row.quantity,
        0
      );

      // Update cart table with new values
      await connection.execute(
        "UPDATE cart SET totalCost = ?, totalItems = ? WHERE memberFK = ?",
        [updatedTotalCost, updatedTotalItems, memberID]
      );

      res
        .status(200)
        .json({ message: "Item removed from the cart successfully" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }

    connection.release();
  } catch (error) {
    console.error("Error processing cart request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
