const RABBITMQ_URL = process.env.RABBITMQ_URL;
const POSTGRES_URL = process.env.POSTGRES_URL;
const RANDOM_WORD_API = process.env.RANDOM_WORD_API;
const SECRET_KEY = process.env.SECRET_KEY;

// Topic Configurations
const TOPIC1 = 'topic1';
const TOPIC2 = 'topic2';
const TOPIC3 = 'topic3';

module.exports = {
    RABBITMQ_URL,
    POSTGRES_URL,
    RANDOM_WORD_API,
    SECRET_KEY,
    TOPIC1,
    TOPIC2,
    TOPIC3
};
