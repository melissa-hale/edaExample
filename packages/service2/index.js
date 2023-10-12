const amqp = require('amqplib');
const { Pool } = require('pg');
require('dotenv').config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const POSTGRES_URL = process.env.POSTGRES_URL;
const TOPIC = 'topic2';
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;  // in milliseconds

async function connectRabbitMQ(retries = MAX_RETRIES) {
    while (retries) {
        try {
            return await amqp.connect(RABBITMQ_URL);
        } catch (err) {
            console.error(`Failed to connect to RabbitMQ. Retries left: ${retries}`);
            retries -= 1;
            if (retries === 0) throw err;
            await new Promise(res => setTimeout(res, RETRY_DELAY));
        }
    }
}

async function init() {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();

    // Ensure the topic exists
    await channel.assertQueue(TOPIC, { durable: true });

    // Set up PostgreSQL connection
    const pool = new Pool({
        connectionString: POSTGRES_URL,
    });

    console.log(`Service2 is waiting for messages in topic: ${TOPIC}.`);

    channel.consume(TOPIC, async (msg) => {
        if (msg !== null) {
            const event = JSON.parse(msg.content.toString());
            console.log(`Received event: ${event.eventType}`);

            // Insert a record into the PostgreSQL database
            try {
                await pool.query(`INSERT INTO topic2 (event_data) VALUES ($1)`, [event]);
                console.log(`Inserted event into the database`);
                channel.ack(msg);
            } catch (error) {
                console.error('Failed to insert event into database:', error);
                // You can implement further error handling here:
                // 1. Send to a dead-letter queue for failed messages.
                // 2. Implement a retry mechanism for certain errors.
                // 3. Alert or notify for manual inspection.
                // For now, we just don't acknowledge the message, so it'll be requeued.
            }
        }
    });
}

init().catch(console.error);
