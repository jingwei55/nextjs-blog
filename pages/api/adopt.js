// api/adopt.js
import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { memberID, petID } = req.body;

  try {
    // Update the pets table to link the memberID with the petID
    await query(
      `
      UPDATE pets
      SET PM_FK = ?
      WHERE petID = ?
      `,
      [memberID, petID]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adopting pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
