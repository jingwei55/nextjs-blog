// pages/api/cart.js
import query from "../../lib/query";

export default async function handler(req, res) {
  const { memberID } = req.query;
  console.log("MemberID api/cart: ", memberID);
  try {
    // Fetch cart data from the cartitems table based on memberID
    const rows = await query(
      `
      SELECT items.ItemID, items.name, items.price, cartitems.item_quantity, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM cartitems
      JOIN items ON cartitems.itemFK = items.itemID
      JOIN shelters ON items.IS_FK = shelters.shelterID
      WHERE cartFK = ?
      `,
      [memberID]
    );

    // console.log("Cart data: ", rows);

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
