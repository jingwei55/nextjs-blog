// api/attendworkshop.js
import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { memberID, workshopID } = req.body;
  console.log("api/attendworkshop memberID: ", memberID);

  try {
    // Insert a new record into the attendworkshop table to link the memberID with the workshopID
    await query(
      `
      INSERT INTO attendworkshop (workshopFK, memberFK)
      VALUES (?, ?)
      `,
      [workshopID, memberID]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error attending workshop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
