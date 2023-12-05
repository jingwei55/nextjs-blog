//api/items.js

import query from "../../lib/query";

export default async function handler(_, res) {
  try {
    // Start the query to fetch shelter names
    const rows = await query(
      "SELECT itemID, name, price, item_type, quantity FROM items"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
