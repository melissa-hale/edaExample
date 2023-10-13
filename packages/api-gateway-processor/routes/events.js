const amqp = require("amqplib");
const { getTopicForEvent, RABBITMQ_URL } = require("../config/settings");

async function sendEvent(req, res) {
  const { eventType } = req.body;
  const { count } = req.body;

  if (!eventType) {
    return res.status(400).json({ error: "eventType is required" });
  }

  for (let i = 0; i < count; i++) {
    try {
        await sendMessageToQueue(eventType, req.body);
        console.log(`Sent ${i} message(s) to queue`);
    } catch (error) {
        console.error("Error sending event:", error);
        res.status(500).send({ error: "Failed to send event, cancelling" });
    }
    }
    res.status(200).send({ status: `${count} events sent successfully` });
}

async function sendMessageToQueue(eventType, message) {
  let connection, channel;
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    const topic = getTopicForEvent(eventType);
    if (!topic) {
      throw new Error("Invalid eventType provided.");
    };
    await channel.assertQueue(topic, { durable: true });
    
    message.create_date = new Date().toISOString();

    channel.sendToQueue(topic, Buffer.from(JSON.stringify(message)));
  } finally {
    if (channel) {
      await channel.close();
    }
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
    sendEvent
};