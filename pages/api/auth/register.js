// // pages/api/auth/register.js
import query from "../../../lib/query";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 8);

    // Set the current date as Datejoined
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Determine the table based on the user's role
    let tableName;
    if (role === "employee") {
      tableName = "employees";
    } else if (role === "member") {
      tableName = "members";
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Insert user data into the database with Datejoined
    const results = await query(
      `INSERT INTO ${tableName} (username, email, password, Datejoined) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, currentDate]
    );

    const memberId = results.insertId;

    // Create a new shopping cart for the member
    if (role === "member") {
      // Insert user data into the database with Datejoined
      const cartResults = await query(
        "INSERT INTO cart (totalCost, totalItems, memberFK) VALUES (0, 0, ?)",
        [memberId]
      );
    }

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// // pages/api/auth/register.js
// import query from "../../../lib/query";
// import bcrypt from "bcrypt";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     // Hash the password before storing it in the database
//     const hashedPassword = await bcrypt.hash(password, 8);

//     // Set the current date as Datejoined
//     const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

//     // Insert user data into the 'members' table with Datejoined
//     const results = await query(
//       "INSERT INTO members (username, email, password, Datejoined) VALUES (?, ?, ?, ?)",
//       [username, email, hashedPassword, currentDate]
//     );

//     const memberId = results.insertId;

//     // Create a new shopping cart for the member
//     // Uncomment the following lines if you want to create a shopping cart for the member
//     // const cartResults = await query(
//     //   "INSERT INTO cart (membersFK, totalCost, totalItems) VALUES (?, 0, 0)",
//     //   [memberId]
//     // );

//     res.status(200).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
