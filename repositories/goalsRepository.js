const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

async function findByCustomer(customerId) {
  const db = getDB();
  return await db.collection("goals").findOne({ customerId: new ObjectId(customerId) });
}

async function upsertGoal(customerId, targetWordCount, examDate) {
  const db = getDB();
  return await db.collection("goals").updateOne(
    { customerId: new ObjectId(customerId) },
    { $set: { targetWordCount, examDate: new Date(examDate), customerId: new ObjectId(customerId) } },
    { upsert: true }   // creates it if it doesn't exist yet, updates if it does
  );
}

module.exports = { findByCustomer, upsertGoal };