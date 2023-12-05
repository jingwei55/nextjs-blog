// api/attendevent.js
import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { memberID, eventID } = req.body;

  try {
    // Insert a new record into the attendevent table to link the memberID with the eventID
    await query(
      `
      INSERT INTO attendevent (eventFK, memberFK)
      VALUES (?, ?)
      `,
      [eventID, memberID]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error attending event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
