const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const app = express();
const corsOptions = {
    origin: ['http://localhost:3001', process.env.FRONTEND_PUBLIC_DOMAIN],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

// RabbitMQ connection string
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

app.use(bodyParser.json());

// Healthcheck endpoint
app.get('/health', (req, res) => {
    // add logic that actually checks the health of the service
    // there is also a notion of a deep health check
    // for example, connect to RABBITMQ?
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
    console.log(`API Gateway running on port: ${PORT}`);
});
