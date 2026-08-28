const savedWordsRepository = require("../repositories/savedWordsRepository");
const achievementsService = require("./achievementsService");

async function saveWord(customerId, wordData) {
  const existing = await savedWordsRepository.findByWordAndCustomer(customerId, wordData.word);
  if (existing) {
    throw new Error("Word already saved");
  }

  const result = await savedWordsRepository.insert(customerId, wordData);

  // check achievements right after saving
  const allWords = await savedWordsRepository.findByCustomer(customerId);
  const newAchievement = await achievementsService.checkAndUnlock(customerId, allWords.length);

  return { insertedId: result.insertedId, newAchievement };
}

async function getSavedWords(customerId) {
  return await savedWordsRepository.findByCustomer(customerId);
}

async function deleteWord(id, customerId) {
  const result = await savedWordsRepository.deleteById(id, customerId);
  return result.deletedCount;
}

module.exports = { saveWord, getSavedWords, deleteWord };