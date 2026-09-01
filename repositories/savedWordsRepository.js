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

async function updateRelatedWords(id, relatedWords) {
  const db = getDB();
  return await db.collection("savedWords").updateOne(
    { _id: new ObjectId(id) },
    { $set: { relatedWords } }
  );
}

async function findRandom(customerId, excludeId = null) {
  const db = getDB();
  const filter = { customerId: new ObjectId(customerId) };
  if (excludeId) filter._id = { $ne: new ObjectId(excludeId) };

  const count = await db.collection("savedWords").countDocuments(filter);
  if (count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);
  const results = await db.collection("savedWords").find(filter).skip(randomIndex).limit(1).toArray();
  return results[0];
}

async function findRandomMultiple(customerId, count) {
  const db = getDB();
  return await db.collection("savedWords")
    .aggregate([
      { $match: { customerId: new ObjectId(customerId) } },
      { $sample: { size: count } }
    ])
    .toArray();
}

async function findDueForReview(customerId) {
  const db = getDB();
  return await db.collection("savedWords").find({
    customerId: new ObjectId(customerId),
    $or: [
      { nextReviewAt: { $lte: new Date() } },
      { nextReviewAt: { $exists: false } }   // words never reviewed yet are also due
    ]
  }).toArray();
}

async function updateReviewResult(id, { correct }) {
  const db = getDB();
  const word = await db.collection("savedWords").findOne({ _id: new ObjectId(id) });

  const currentInterval = word.intervalDays || 1;
  const newInterval = correct ? currentInterval * 2 : 1;

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + newInterval);

  return await db.collection("savedWords").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        lastReviewedAt: new Date(),
        nextReviewAt,
        intervalDays: newInterval
      },
      $inc: { reviewCount: 1 }
    }
  );
}

module.exports = { insert, findByCustomer, findByWordAndCustomer, deleteById, updateRelatedWords, findRandom, findRandomMultiple, findDueForReview, updateReviewResult };