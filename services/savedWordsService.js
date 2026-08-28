const savedWordsRepository = require("../repositories/savedWordsRepository");
const achievementsService = require("./achievementsService");
const { getChannel, QUEUE_NAME } = require("../config/rabbitmq");

async function saveWord(customerId, wordData) {
  const existing = await savedWordsRepository.findByWordAndCustomer(customerId, wordData.word);
  if (existing) {
    throw new Error("Word already saved");
  }

  const result = await savedWordsRepository.insert(customerId, wordData);

  // publish an event for background enrichment — don't wait for it to finish
  const channel = getChannel();
  const message = JSON.stringify({
    savedWordId: result.insertedId.toString(),
    word: wordData.word
  });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });

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