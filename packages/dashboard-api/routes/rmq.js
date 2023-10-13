const axios = require('axios');
const { RABBITMQ_URL } = require("../config/settings");

async function getRmqData(req, res) {
    try {
        const response = await axios.get(`https://${RABBITMQ_URL}/api/queues`, {
            auth: {
                username: process.env.RABBITMQ_USER,
                password: process.env.RABBITMQ_PASSWORD
            }
        });
        
        const myQueue = response.data.find(queue => queue.name === 'topic1');
        res.json({ queueLength: myQueue.messages });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch RabbitMQ metrics' });
    }
}

module.exports = {
    getRmqData
};