// // pages/api/shop.js

import query from "../../lib/query";

export default async function handler(req, res) {
  try {
    const rows = await query(`
      SELECT items.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM items
      JOIN shelters ON items.IS_FK = shelters.shelterID
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching workshops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
