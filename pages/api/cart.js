// // // pages/api/cart.js
// // export default function handler(req, res) {
// //   if (req.method === "GET") {
// //     // Hardcoded cart data
// //     const cartData = {
// //       totalCost: 25.98,
// //       totalItems: 3,
// //       items: [
// //         {
// //           itemID: 1,
// //           quantity: 2,
// //           item: {
// //             name: "Pet Food",
// //             price: 15.99,
// //           },
// //         },
// //         {
// //           itemID: 2,
// //           quantity: 1,
// //           item: {
// //             name: "Pet Toy",
// //             price: 9.99,
// //           },
// //         },
// //       ],
// //     };

// //     res.status(200).json(cartData);
// //   } else {
// //     res.status(405).json({ error: "Method Not Allowed" });
// //   }
// // }

// pages/api/cart.js

import mysql from "mysql2/promise";

// Configure your MySQL connection
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
  const { memberID } = req.query;
  // console.log("MemberID api/cart: ", memberID);
  try {
    const connection = await pool.getConnection();

    // Fetch cart data from the cartitems table based on memberID
    const [rows] = await connection.execute(
      `
      SELECT items.name, items.price, cartitems.item_quantity
      FROM cartitems
      JOIN items ON cartitems.itemFK = items.itemID
      WHERE cartFK = ?
      `,
      [memberID]
    );

    connection.release();
    // Calculate totalCost and totalItems based on the fetched data
    const totalItems = rows.reduce((acc, row) => acc + row.item_quantity, 0);

    const totalCost = rows.reduce((acc, row) => {
      // Convert the price to a float and multiply by the quantity
      const itemCost = parseFloat(row.price) * row.item_quantity;
      return acc + itemCost;
    }, 0);

    // Respond with the cart data, including totalItems and totalCost
    res.status(200).json({
      rows,
      totalItems: totalItems,
      totalCost: totalCost.toFixed(2), // Displaying with two decimal places
    });
    // Respond with the cart data
    // console.log("Results: ", rows, totalItems, totalCost);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
