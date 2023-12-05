// pages/api/surrenderPet.js
import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { petName, petType, petAge, description, shelter } = req.body;

  try {
    // Insert the surrendered pet into the database
    const result = await query(
      "INSERT INTO pets (name, pet_type, age, `desc`, PS_FK) VALUES (?, ?, ?, ?, ?)",
      [petName, petType, petAge, description, shelter]
    );

    res.status(200).json({
      message: "Pet surrendered successfully",
      petId: result.insertId,
    });
  } catch (error) {
    console.error("Error surrendering pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
