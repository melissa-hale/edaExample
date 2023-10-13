const eventToTopicMapping = {
    passiveEvent: 'topic1',
    actionEvent: 'topic2'
};

function getTopicForEvent(eventType) {
    return eventToTopicMapping[eventType] || null; // returns null if eventType not found
};

const RABBITMQ_URL = process.env.RABBITMQ_URL;

module.exports = {
    getTopicForEvent,
    RABBITMQ_URL,
};
