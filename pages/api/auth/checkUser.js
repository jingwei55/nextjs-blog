// pages/api/auth/checkUser.js
import query from "../../../lib/query";

export default async function handler(req, res) {
  const { username, email, role } = req.body;

  if (!username || !email || !role) {
    return res
      .status(400)
      .json({ error: "Username, email and role are required" });
  }

  let tableName;
  if (role === "employee") {
    tableName = "employees";
  } else if (role === "member") {
    tableName = "members";
  } else {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const results = await query(
      `SELECT COUNT(*) as count FROM ${tableName} WHERE username = ? OR email = ?`,
      [username, email]
    );

    const userExists = results[0].count > 0;

    res.status(200).json({ exists: userExists });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
