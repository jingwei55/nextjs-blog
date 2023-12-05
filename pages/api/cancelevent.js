// api/cancelevent.js
import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { memberID, eventID } = req.body;

  try {
    // Begin a transaction to ensure atomicity
    await query("BEGIN");

    try {
      // Update the attendance status for the specified event
      await query(
        `
        DELETE FROM attendevent
        WHERE eventFK = ?
        AND memberFK = ?
        `,
        [eventID, memberID]
      );

      // Commit the transaction if everything is successful
      await query("COMMIT");

      res.status(200).json({ success: true });
    } catch (error) {
      // Rollback the transaction in case of any error
      await query("ROLLBACK");

      throw error; // Re-throw the error for the outer catch block
    }
  } catch (error) {
    console.error("Error canceling attendance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
