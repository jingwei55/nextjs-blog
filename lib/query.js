// query.js
import pool from "./db";

const query = async (sql, values) => {
  // prevent SQL injection by parameterizing queries
  const [results] = await pool.query(sql, values);
  return results;
};

export default query;
