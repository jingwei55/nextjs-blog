// pages/api/workshop.js
import query from "../../lib/query";

export default async function handler(req, res) {
  const { memberID } = req.query;
  console.log("api/workshop memberID: ", memberID);

  try {
    // Start the query
    const rows = await query(
      `
      SELECT workshops.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM workshops
      JOIN shelters ON workshops.WS_FK = shelters.shelterID
      LEFT JOIN attendworkshop ON workshops.workshopID = attendworkshop.workshopFK AND attendworkshop.memberFK = ?
      WHERE attendworkshop.workshopFK IS NULL
      `,
      [memberID]
    );

    console.log("api/workshop data: ", rows);

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching workshops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
