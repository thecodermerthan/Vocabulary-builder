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
    // kelimenin kendisi ASLA döndürülmez — cevap bu olacak
  };
}

function checkAnswer(correctWord, userAnswer) {
  return correctWord.trim().toLowerCase() === userAnswer.trim().toLowerCase();
}

async function getMultipleChoice(customerId) {
  const words = await savedWordsRepository.findRandomMultiple(customerId, 4);
  if (words.length < 4) {
    throw new Error("You need at least 4 saved words to take a multiple choice quiz");
  }

  const correctWord = words[0];
  const options = words.map(w => w.word).sort(() => Math.random() - 0.5);   // karıştır

  return {
    quizId: correctWord._id,
    definition: correctWord.definition,
    options
  };
}

module.exports = { getAnswerShortQuestion, checkAnswer, getMultipleChoice };