// api/attendingevents.js
import query from "../../lib/query";

export default async function handler(req, res) {
  const { memberID } = req.query;
  console.log("api/attendingevents memberID: ", memberID);

  try {
    // Start the query to fetch events attended by the user
    const rows = await query(
      `
      SELECT events.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM events
      JOIN shelters ON events.ES_FK = shelters.shelterID
      JOIN attendevent ON events.eventID = attendevent.eventFK
      WHERE attendevent.memberFK = ?
      `,
      [memberID]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching attending events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
