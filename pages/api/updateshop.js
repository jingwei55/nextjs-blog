// pages/api/surrenderPet.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "adoptionwebsite",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  let result;
  try {
    const { name, price, item_type, quantity, shelter } = req.body;
    const connection = await pool.getConnection();
    console.log("Result received: ", req.body);

    // Check if a duplicate entry exists based on both name and shelter
    const [existingRows] = await connection.execute(
      "SELECT * FROM items WHERE name = ? AND IS_FK = ?",
      [name, shelter]
    );

    // console.log("Finding duplicates in same shelter: ", existingRows);

    if (existingRows.length > 0) {
      // If a duplicate entry exists, update the existing row
      [result] = await connection.execute(
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
      //   console.log(`Updated ${result.affectedRows} rows: `, result);
    } else {
      // If no duplicate entry exists, insert a new row
      [result] = await connection.execute(
        "INSERT INTO items (name, price, item_type, quantity, IS_FK) VALUES (?, ?, ?, ?, ?)",
        [name, price, item_type, quantity, shelter]
      );
      //   console.log(`Inserted ${result.affectedRows} row: `, result);
    }

    connection.release();
    res.status(200).json({
      message: "Item added successfully",
      petId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
