const { connectRabbitMQ } = require("./mq");
const { insertIntoDB } = require("./db");
const { decrypt } = require("./utils/crypto");
const { TOPIC3 } = require("./config");
const { getDiffInMs } = require("./utils/time");

function handleMessage(channel, topic, msg) {
  if (!msg) return;

  const event = JSON.parse(msg.content.toString());
  console.log(`Received event: ${event.eventType} from topic: ${topic}`);

  const decryptedData = decrypt(event.secretValue);
  
  event.processed_at = new Date().toISOString();
  event.total_time_ms = getDiffInMs(event.create_date, event.processed_at);
  event.secret_word = decryptedData;

  try {
    insertIntoDB("topic3", event);
    console.log(`Inserted secret word into the database from topic3`);
    channel.ack(msg);
  } catch (error) {
    console.error("Failed to insert secret work into database:", error);
  }
}

async function init() {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();

  // Ensure the topics exists
  await channel.assertQueue(TOPIC3, { durable: true });

  console.log(`Service2 is waiting for messages in topics: ${TOPIC3}.`);

  channel.consume(TOPIC3, (msg) => handleMessage(channel, TOPIC3, msg));
}

init().catch(console.error);
