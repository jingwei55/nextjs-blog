// /lib/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "sql5.freesqldatabase.com", // || "localhost" || process.env.DB_HOST
  user: "sql5669992", // process.env.DB_USER || "root"
  password: "KqwCkJR1F5", // process.env.DB_PASSWORD || "root"
  database: "sql5669992", // process.env.DB_DATABASE || "adoptionwebsite"
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
