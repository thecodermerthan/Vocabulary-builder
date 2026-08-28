const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

async function insert(customerId, title, description) {
  const db = getDB();
  return await db.collection("achievements").insertOne({
    customerId: new ObjectId(customerId),
    title,
    description,
    unlockedAt: new Date()
  });
}

async function findByCustomer(customerId) {
  const db = getDB();
  return await db.collection("achievements")
    .find({ customerId: new ObjectId(customerId) })
    .toArray();
}

async function existsByTitle(customerId, title) {
  const db = getDB();
  return await db.collection("achievements").findOne({
    customerId: new ObjectId(customerId),
    title
  });
}

module.exports = { insert, findByCustomer, existsByTitle };