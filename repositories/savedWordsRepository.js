const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

async function insert(customerId, wordData) {
  const db = getDB();
  return await db.collection("savedWords").insertOne({
    customerId: new ObjectId(customerId),
    ...wordData,
    dateSaved: new Date()
  });
}

async function findByCustomer(customerId) {
  const db = getDB();
  return await db.collection("savedWords")
    .find({ customerId: new ObjectId(customerId) })
    .toArray();
}

async function findByWordAndCustomer(customerId, word) {
  const db = getDB();
  return await db.collection("savedWords").findOne({
    customerId: new ObjectId(customerId),
    word
  });
}

async function deleteById(id, customerId) {
  const db = getDB();
  return await db.collection("savedWords").deleteOne({
    _id: new ObjectId(id),
    customerId: new ObjectId(customerId)
  });
}

module.exports = { insert, findByCustomer, findByWordAndCustomer, deleteById };