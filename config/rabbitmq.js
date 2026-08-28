const amqp = require("amqplib");

const QUEUE_NAME = "word_enrichment";
let channel;

async function connectQueue() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  console.log("Connected to RabbitMQ, queue ready:", QUEUE_NAME);
  return channel;
}

function getChannel() {
  if (!channel) throw new Error("RabbitMQ channel not initialized. Call connectQueue first.");
  return channel;
}

module.exports = { connectQueue, getChannel, QUEUE_NAME };