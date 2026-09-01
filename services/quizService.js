const savedWordsRepository = require("../repositories/savedWordsRepository");

async function getAnswerShortQuestion(customerId) {
  const word = await savedWordsRepository.findRandom(customerId);
  if (!word) {
    throw new Error("You have no saved words yet");
  }

  return {
    quizId: word._id,
    definition: word.definition,
    partOfSpeech: word.partOfSpeech
  };
}

function checkAnswer(correctWord, userAnswer) {
  return correctWord.trim().toLowerCase() === userAnswer.trim().toLowerCase();
}

async function submitAnswer(quizId, userAnswer) {
  const db = require("../config/db").getDB();
  const { ObjectId } = require("mongodb");

  const word = await db.collection("savedWords").findOne({ _id: new ObjectId(quizId) });
  if (!word) throw new Error("Question not found");

  const isCorrect = checkAnswer(word.word, userAnswer);
  await savedWordsRepository.updateReviewResult(quizId, { correct: isCorrect });

  return { correct: isCorrect, correctWord: word.word };
}

async function getMultipleChoice(customerId) {
  const words = await savedWordsRepository.findRandomMultiple(customerId, 4);
  if (words.length < 4) {
    throw new Error("You need at least 4 saved words to take a multiple choice quiz");
  }

  const correctWord = words[0];
  const options = words.map(w => w.word).sort(() => Math.random() - 0.5);

  return {
    quizId: correctWord._id,
    definition: correctWord.definition,
    options
  };
}

async function getDueForReview(customerId) {
  return await savedWordsRepository.findDueForReview(customerId);
}

module.exports = { getAnswerShortQuestion, submitAnswer, getMultipleChoice, getDueForReview };