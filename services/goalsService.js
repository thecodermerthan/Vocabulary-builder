const goalsRepository = require("../repositories/goalsRepository");
const savedWordsRepository = require("../repositories/savedWordsRepository");

async function setGoal(customerId, targetWordCount, examDate) {
  await goalsRepository.upsertGoal(customerId, targetWordCount, examDate);
}

async function getProgress(customerId) {
  const goal = await goalsRepository.findByCustomer(customerId);
  if (!goal) {
    throw new Error("No goal set yet");
  }

  const savedWords = await savedWordsRepository.findByCustomer(customerId);
  const wordCount = savedWords.length;

  const daysLeft = Math.ceil((new Date(goal.examDate) - new Date()) / (1000 * 60 * 60 * 24));
  const percentComplete = Math.min(100, Math.round((wordCount / goal.targetWordCount) * 100));

  return {
    wordCount,
    targetWordCount: goal.targetWordCount,
    percentComplete,
    daysLeft
  };
}

module.exports = { setGoal, getProgress };