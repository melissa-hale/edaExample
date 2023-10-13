const { Pool } = require("pg");
const { POSTGRES_URL } = require("../config");

const pool = new Pool({
  connectionString: POSTGRES_URL,
});

async function insertIntoDB(table, eventData) {
  return pool.query(`INSERT INTO ${table} (event_data) VALUES ($1)`, [
    eventData,
  ]);
};

module.exports = {
  insertIntoDB,
};
