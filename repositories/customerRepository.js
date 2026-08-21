const { getDB } = require("../config/db");

async function findByEmail(email) {
  const db = getDB();
  return await db.collection("customers").findOne({ email });
}

async function insertCustomer(customerData) {
  const db = getDB();
  return await db.collection("customers").insertOne(customerData);
}

async function findAll() {
  const db = getDB();
  return await db.collection("customers").find().toArray();
}

module.exports = { findByEmail, insertCustomer, findAll };

