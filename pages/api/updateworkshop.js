// pages/api/updateworkshopt.js
import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, desc, date, shelter } = req.body;
    const formattedDate = new Date(date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Check if a duplicate entry exists based on both name and shelter
    const existingRows = await query(
      "SELECT * FROM workshops WHERE name = ? AND WS_FK = ?",
      [name, shelter]
    );

    console.log("Finding duplicates in the same shelter: ", existingRows);

    let result;

    if (existingRows.length > 0) {
      // If a duplicate entry exists, update the existing row
      result = await query(
        `
          UPDATE workshops
          SET
            \`desc\` = ?,
            date = ?
          WHERE
            name = ? AND WS_FK = ?
          `,
        [desc, formattedDate, name, shelter]
      );
      console.log(`Updated ${result.affectedRows} rows: `, result);
    } else {
      // If no duplicate entry exists, insert a new row
      result = await query(
        "INSERT INTO workshops (name, `desc`, date, WS_FK) VALUES (?, ?, ?, ?)",
        [name, desc, formattedDate, shelter]
      );
      console.log(`Inserted ${result.affectedRows} row: `, result);
    }

    res.status(200).json({
      message: "Workshop added successfully",
      petId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding workshop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
