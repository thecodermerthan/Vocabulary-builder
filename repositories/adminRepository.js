const { getDB } = require("../config/db");

async function findAllSavedWordsWithCustomers() {
  const db = getDB();
  return await db.collection("savedWords").aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customerInfo"
      }
    },
    { $unwind: "$customerInfo" },
    {
      $project: {
        word: 1,
        definition: 1,
        dateSaved: 1,
        "customerInfo.name": 1,
        "customerInfo.email": 1
      }
    }
  ]).toArray();
}

module.exports = { findAllSavedWordsWithCustomers };