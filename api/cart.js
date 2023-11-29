// // pages/api/cart.js
// import { query } from "../../lib/db";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   // Extract the user's cart ID from the request (you may get this from the user's session or authentication)
//   const userCartId = 1; // Replace with your logic to get the user's cart ID

//   try {
//     // Perform a SQL query to fetch cart items based on the user's cart ID
//     const results = await query(
//       "SELECT items.itemID, items.itemName, items.itemPrice, cartItems.quantity FROM items JOIN cartItems ON items.itemID = cartItems.itemID JOIN cart ON cartItems.cartID = cart.cartID WHERE cart.cartID = ?",
//       [userCartId]
//     );

//     // Calculate totalCost and totalItems
//     let totalCost = 0;
//     let totalItems = 0;

//     // Map the SQL results to the desired format
//     const items = results.map((item) => {
//       const { itemID, itemName, itemPrice, quantity } = item;

//       // Calculate the subtotal for each item
//       const subtotal = itemPrice * quantity;

//       // Increment totalCost and totalItems
//       totalCost += subtotal;
//       totalItems += quantity;

//       return {
//         itemID,
//         quantity,
//         item: {
//           name: itemName,
//           price: itemPrice,
//         },
//       };
//     });

//     // Send the results as JSON response in the desired format
//     const cartData = {
//       totalCost: totalCost.toFixed(2),
//       totalItems,
//       items,
//     };

//     res.status(200).json(cartData);
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// pages/api/cart.js
export default function handler(req, res) {
  if (req.method === "GET") {
    // Hardcoded cart data
    const cartData = {
      totalCost: 25.98,
      totalItems: 3,
      items: [
        {
          itemID: 1,
          quantity: 2,
          item: {
            name: "Pet Food",
            price: 15.99,
          },
        },
        {
          itemID: 2,
          quantity: 1,
          item: {
            name: "Pet Toy",
            price: 9.99,
          },
        },
      ],
    };

    res.status(200).json(cartData);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
