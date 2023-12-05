// api/adoptedpets.js
import query from "../../lib/query";

export default async function handler(req, res) {
  const { memberID } = req.query;

  try {
    // Fetch adopted pets data from the adoptions table based on memberID
    const rows = await query(
      `
      SELECT pets.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM pets
      JOIN shelters ON pets.PS_FK = shelters.shelterID
      WHERE pets.PM_FK = ?
    `,
      [memberID]
    );

    // Respond with the adopted pets data
    res.status(200).json({
      adoptedPets: rows,
    });
  } catch (error) {
    console.error("Error fetching adopted pets data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
