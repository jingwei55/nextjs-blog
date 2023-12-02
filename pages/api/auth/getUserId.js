// pages/api/auth/get-member-id.js

import query from "../../../lib/query"; // Import your database connection

export default async function handler(req, res) {
  const { username, role } = req.body;
  let results;
  let userID;

  try {
    if (role === "employee") {
      results = await query(
        `SELECT employeeID FROM employees WHERE username = ?`,
        [username]
      );
    } else if (role === "member") {
      results = await query(`SELECT memberID FROM members WHERE username = ?`, [
        username,
      ]);
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }
    userID = results[0].employeeID || results[0].memberID;

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username" });
    }
    // Respond with the appropriate ID
    res.status(200).json({ userID, message: "getUserId successful" });
  } catch (error) {
    console.error("Error fetching userID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
