const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const app = express();
const PORT = process.env.PORT || 3000;  // Adjust as needed

// RabbitMQ connection string
const RABBITMQ_URL = 'amqp://localhost';  // Adjust if RabbitMQ is not running locally

app.use(bodyParser.json());

// Healthcheck endpoint
app.get('/health', (req, res) => {
    res.status(200).send({ status: 'ok' });
  });

app.post('/events', async (req, res) => {
    const { eventType } = req.body;

    if (!eventType) {
        return res.status(400).json({ error: 'eventType is required' });
    }

    let connection, channel;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();

        const topic = eventType === 'service1' ? 'topic1' : 'topic2';

        // Ensure the topic exists
        await channel.assertQueue(topic, { durable: true });

        // Send the event to the topic
        channel.sendToQueue(topic, Buffer.from(JSON.stringify(req.body)));

        res.status(200).send({ status: 'Event sent successfully' });

    } catch (error) {
        console.error('Error sending event:', error);
        res.status(500).send({ error: 'Failed to send event' });

    } finally {
        if (channel) {
            await channel.close();
        }
        if (connection) {
            await connection.close();
        }
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
