const amqp = require('amqplib');
const { RABBITMQ_URL } = require('../config');

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

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

module.exports = {
    connectRabbitMQ
};
