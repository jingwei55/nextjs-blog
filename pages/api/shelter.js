// pages/api/shelter.js

import query from "../../lib/query";

export default async function handler(_, res) {
  try {
    const rows = await query("SELECT shelterID, name FROM shelters");

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
