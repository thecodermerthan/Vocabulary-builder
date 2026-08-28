const quizService = require("../services/quizService");
const savedWordsRepository = require("../repositories/savedWordsRepository");

async function answerShortQuestion(req, res) {
  try {
    const question = await quizService.getAnswerShortQuestion(req.customer.customerId);
    res.json(question);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function checkAnswerShortQuestion(req, res) {
  try {
    const { quizId, answer } = req.body;
    const db = require("../config/db").getDB();
    const { ObjectId } = require("mongodb");

    const word = await db.collection("savedWords").findOne({ _id: new ObjectId(quizId) });
    if (!word) return res.status(404).json({ error: "Question not found" });

    const isCorrect = quizService.checkAnswer(word.word, answer);
    res.json({ correct: isCorrect, correctWord: word.word });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function multipleChoice(req, res) {
  try {
    const question = await quizService.getMultipleChoice(req.customer.customerId);
    res.json(question);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { answerShortQuestion, checkAnswerShortQuestion, multipleChoice };