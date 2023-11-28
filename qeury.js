// query.js
import pool from "./db";

const query = async (sql, values) => {
  const [results] = await pool.query(sql, values);
  return results;
};

export default query;
