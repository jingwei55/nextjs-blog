// /lib/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "sql3.freesqldatabase.com", // || "localhost" || process.env.DB_HOST
  user: "sql3667647", // process.env.DB_USER || "root"
  password: "ueHC1xt34x", // process.env.DB_PASSWORD || "root"
  database: "sql3667647", // process.env.DB_DATABASE || "adoptionwebsite"
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
