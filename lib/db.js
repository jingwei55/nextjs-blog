// /lib/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "adoptionwebsite",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

// lib/db.js
// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "root",
//   database: process.env.DB_DATABASE || "your_database_name",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// const query = async (sql, values) => {
//   const [results] = await pool.execute(sql, values);
//   return results;
// };

// export { query }; // Use named export
