import query from "../../lib/query";

export default async function handler(req, res) {
  const { memberID } = req.query;
  console.log("api/attendingworkshops memberID: ", memberID);

  try {
    // Start the query to fetch workshops attended by the user
    const workshops = await query(
      `
      SELECT workshops.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM workshops
      JOIN shelters ON workshops.WS_FK = shelters.shelterID
      JOIN attendworkshop ON workshops.workshopID = attendworkshop.workshopFK
      WHERE attendworkshop.memberFK = ?
      `,
      [memberID]
    );

    res.status(200).json(workshops);
  } catch (error) {
    console.error("Error fetching attending workshops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
