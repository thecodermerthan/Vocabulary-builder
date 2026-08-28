const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  await client.connect();
  console.log("Connected to Atlas!");
  db = client.db("vocabuilder");
  return db;
}

function getDB() {
  if (!db) throw new Error("Database not initialized. Call connectDB first.");
  return db;
}

async function closeDB() {
  await client.close();
}

module.exports = { connectDB, getDB, closeDB };