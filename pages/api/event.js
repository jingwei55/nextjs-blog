// pages/api/event.js
import query from "../../lib/query";

export default async function handler(req, res) {
  const { memberID } = req.query;
  console.log("api/event memberID: ", memberID);

  try {
    // Start the query
    const rows = await query(
      `
        SELECT events.*, shelters.location AS shelter_location, shelters.name AS shelter_name
        FROM events
        JOIN shelters ON events.ES_FK = shelters.shelterID
        LEFT JOIN attendevent ON events.eventID = attendevent.eventFK AND attendevent.memberFK = ?
        WHERE attendevent.eventFK IS NULL
      `,
      [memberID]
    );

    // console.log("api/event data: ", rows);

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
