// pages/api/auth/login.js
import bcrypt from "bcrypt";
import query from "../../../path-to-query";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ error: "One or more of the fields are empty" });
  }

  try {
    // Check if the user exists in the database
    const results = await query(
      "SELECT * FROM users WHERE username = ? AND role = ?",
      [username, role]
    );

    if (results.length === 0) {
      return res.status(401).json({ error: "User does not exist!" });
    }

    // Verify the password
    const match = await bcrypt.compare(password, results[0].password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Authentication successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
