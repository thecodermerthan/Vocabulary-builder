const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/quiz/answerShortQuestion", authenticateToken, quizController.answerShortQuestion);
router.post("/quiz/answerShortQuestion/check", authenticateToken, quizController.checkAnswerShortQuestion);
router.get("/quiz/multipleChoice", authenticateToken, quizController.multipleChoice);

module.exports = router;