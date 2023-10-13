const RABBITMQ_URL = process.env.RABBITMQ_URL;
const POSTGRES_URL = process.env.POSTGRES_URL;
const SECRET_KEY = process.env.SECRET_KEY;

// Topic Configurations
const TOPIC3 = 'topic3';

module.exports = {
    RABBITMQ_URL,
    POSTGRES_URL,
    SECRET_KEY,
    TOPIC3
};
