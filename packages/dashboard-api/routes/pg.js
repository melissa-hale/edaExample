const { Pool } = require('pg');
const { POSTGRES_URL } = require("../config/settings");

// Database connection
const pool = new Pool({
    connectionString: POSTGRES_URL,
});

async function getPgData(req, res) {
    let topic = req.query.topic;
    try {
        const result = await pool.query(`SELECT event_data FROM ${topic}`);
        const data = result.rows.map(item => item.event_data);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}


module.exports = {
    getPgData
};