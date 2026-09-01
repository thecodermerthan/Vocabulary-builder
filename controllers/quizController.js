const quizService = require("../services/quizService");

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
    const result = await quizService.submitAnswer(quizId, answer);
    res.json(result);
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

async function dueForReview(req, res) {
  try {
    const words = await quizService.getDueForReview(req.customer.customerId);
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { answerShortQuestion, checkAnswerShortQuestion, multipleChoice, dueForReview };