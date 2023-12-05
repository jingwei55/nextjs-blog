import query from "../../lib/query";

export default async function handler(_, res) {
  try {
    // Start the query
    const rows = await query(`
      SELECT pets.*, shelters.location AS shelter_location, shelters.name AS shelter_name
      FROM pets
      JOIN shelters ON pets.PS_FK = shelters.shelterID
      WHERE pets.PM_FK IS NULL
    `);

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
