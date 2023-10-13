const { connectRabbitMQ } = require('./mq');
const { insertIntoDB } = require('./db');
const { getRandomWord } = require('./utils/random');
const { encrypt } = require('./utils/crypto');
const { TOPIC1, TOPIC2, TOPIC3 } = require('./config');
const { getDiffInMs } = require("./utils/time");

async function processTopic2Message(channel, event) {
    try {
        insertIntoDB('topic2', event);
        console.log(`Inserted event into the database for topic2`);

        console.log('prepare message to place on topic3');
        
        const randomWord = await getRandomWord();
        const encryptedData = encrypt(randomWord);

        event.secretValue = encryptedData;
        event.processed_at = new Date().toISOString();
        event.total_time_ms = getDiffInMs(event.create_date, event.processed_at);

        channel.sendToQueue(TOPIC3, Buffer.from(JSON.stringify(event)));
        console.log(`Created message on queue on topic3`);
    } catch (error) {
        console.error('Failed during processing topic2 message:', error);
    }
}

function handleMessage(channel, topic, msg) {
    if (!msg) return;

    const event = JSON.parse(msg.content.toString());
    console.log(`Received event: ${event.eventType} from topic: ${topic}`);

    event.processed_at = new Date().toISOString();
    event.total_time_ms = getDiffInMs(event.create_date, event.processed_at);

    if (topic === TOPIC1) {
        try {
            insertIntoDB('topic1', event);
            console.log(`Inserted event into the database for topic1`);
            channel.ack(msg);
        } catch (error) {
            console.error('Failed to insert event into database:', error);
        }
    } else if (topic === TOPIC2) {
        processTopic2Message(channel, event);
        channel.ack(msg);
    }
}


async function init() {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();

    // Ensure the topics exists
    await channel.assertQueue(TOPIC1, { durable: true });
    await channel.assertQueue(TOPIC2, { durable: true });
    await channel.assertQueue(TOPIC3, { durable: true });

    console.log(`Service1 is waiting for messages in topics: ${TOPIC1}, ${TOPIC2}.`);

    channel.consume(TOPIC1, msg => handleMessage(channel, TOPIC1, msg));
    channel.consume(TOPIC2, msg => handleMessage(channel, TOPIC2, msg));

};

init().catch(console.error);
