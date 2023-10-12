const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: ['http://localhost:3005', process.env.DASHBOARD_PUBLIC_DOMAIN],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const port = process.env.PORT;

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const POSTGRES_URL = process.env.POSTGRES_URL;

// Database connection
const pool = new Pool({
    connectionString: POSTGRES_URL,
});

app.get('/api/totalTopic1Requests', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM topic1');
        res.json({ count: result.rows[0].count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/totalTopic2Requests', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM topic2');
        res.json({ count: result.rows[0].count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/rabbitmqTopic1Metrics', async (req, res) => {
    try {
        const response = await axios.get(`${RABBITMQ_URL}:15672/api/queues`, {
            auth: {
                username: process.env.RABBITMQ_USER,
                password: process.env.RABBITMQ_PASSWORD
            }
        });
        
        const myQueue = response.data.find(queue => queue.name === 'topic1');
        res.json({ queueLength: myQueue.messages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch RabbitMQ metrics' });
    }
});

app.listen(port, () => {
    console.log(`Dashboard API listening at port :${port}`);
});
