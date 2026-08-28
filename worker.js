require("dotenv").config();
const amqp = require("amqplib");
const { connectDB } = require("./config/db");
const savedWordsRepository = require("./repositories/savedWordsRepository");

const QUEUE_NAME = "word_enrichment";

async function fetchRelatedWords(word) {
  const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}&max=5`);
  const data = await response.json();
  return data.map(item => item.word);
}

async function startWorker() {
  await connectDB();

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log("Worker started, waiting for messages...");

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      const { savedWordId, word } = JSON.parse(msg.content.toString());
      console.log("Processing:", word);

      try {
        const relatedWords = await fetchRelatedWords(word);
        await savedWordsRepository.updateRelatedWords(savedWordId, relatedWords);
        console.log(`Updated "${word}" with related words:`, relatedWords);
      } catch (err) {
        console.error("Failed to enrich word:", err.message);
      }

      channel.ack(msg);   // tell RabbitMQ this message was successfully processed
    }
  });
}

startWorker();