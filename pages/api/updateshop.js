//pages/api/updateshop.js

import query from "../../lib/query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  let result;

  try {
    const { name, price, item_type, quantity, shelter } = req.body;

    // console.log("Data received: ", req.body);

    // Check if a duplicate entry exists based on both name and shelter
    const existingRows = await query(
      "SELECT * FROM items WHERE name = ? AND IS_FK = ?",
      [name, shelter]
    );

    // console.log("existing rows: ", existingRows);

    if (existingRows.length > 0) {
      // If a duplicate entry exists, update the existing row
      result = await query(
        `
          UPDATE items
          SET
            price = ?,
            item_type = ?,
            quantity = ?
          WHERE
            name = ? AND IS_FK = ?
          `,
        [price, item_type, quantity, name, shelter]
      );
      // console.log(`Updated ${result.affectedRows} rows: `, result);
      res.status(200).json({
        message: "Item updated successfully",
      });
    } else {
      // If no duplicate entry exists, insert a new row
      result = await query(
        "INSERT INTO items (name, price, item_type, quantity, IS_FK) VALUES (?, ?, ?, ?, ?)",
        [name, price, item_type, quantity, shelter]
      );
      // console.log(`Inserted ${result.affectedRows} row: `, result);
      res.status(200).json({
        message: "Item added successfully",
        petId: result.insertId,
      });
    }
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
