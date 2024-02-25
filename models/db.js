const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hash",
  password: "hello",
  port: 5432,
  max: 10,
  connectionTimeoutMillis: 20000,
  idleTimeoutMillis: 20000,
  allowExitOnIdle: false,
});

const db = async (sql) => {
  const client = await pool.connect();
  try {
    const result = await client.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error while connecting to the db :", error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = db;
