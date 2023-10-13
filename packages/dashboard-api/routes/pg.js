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
        // res.json({ count: result.rows[0].count });
        const data = result.rows.map(item => item.event_data);
        console.log(data);
        // [{
            // count: 1,
            // eventType: 'passiveEvent',
            // create_date: '2023-10-12T22:28:20.304Z',
            // processed_at: '2023-10-12T22:28:20.307Z'
            // },
            // {
            // count: 1,
            // eventType: 'passiveEvent',
            // create_date: '2023-10-12T23:10:16.329Z',
            // processed_at: '2023-10-12T23:10:16.332Z',
            //  "total_time_ms": 441
            // }]
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}


module.exports = {
    getPgData
};