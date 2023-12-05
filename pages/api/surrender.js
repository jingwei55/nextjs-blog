// pages/api/surrender.js

import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { memberID, petID } = req.body;

  try {
    await query(
      `
      UPDATE pets
      SET PM_FK = NULL
      WHERE petID = ?
      AND PM_FK = ?
      `,
      [petID, memberID]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error surrendering pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
