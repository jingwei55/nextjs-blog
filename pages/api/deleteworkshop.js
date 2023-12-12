// pages/api/deleteworkshop.js
import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, shelter } = req.body;

    // Check if the workshop exists based on name and shelter
    const existingRows = await query(
      "SELECT * FROM workshops WHERE name = ? AND WS_FK = ?",
      [name, shelter]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ error: "Workshop not found" });
    }

    // If the workshop exists, delete it
    const result = await query(
      "DELETE FROM workshops WHERE name = ? AND WS_FK = ?",
      [name, shelter]
    );

    // console.log(`Deleted ${result.affectedRows} row(s): `, result);

    res.status(200).json({ message: "Workshop deleted successfully" });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
