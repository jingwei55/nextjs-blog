// pages/api/auth/checkUser.js
import { query } from "../../../lib/db";

export default async function handler(req, res) {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }

  try {
    const results = await query(
      "SELECT COUNT(*) as count FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    const userExists = results[0].count > 0;

    res.status(200).json({ exists: userExists });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
