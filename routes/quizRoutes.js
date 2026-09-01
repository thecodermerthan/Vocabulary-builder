const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * @swagger
 * /quiz/answerShortQuestion:
 *   get:
 *     tags: [Quiz]
 *     summary: Get a random word's definition to guess
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A quiz question with a definition, no word shown
 *       404:
 *         description: No saved words available
 */
router.get("/quiz/answerShortQuestion", authenticateToken, quizController.answerShortQuestion);

/**
 * @swagger
 * /quiz/answerShortQuestion/check:
 *   post:
 *     tags: [Quiz]
 *     summary: Submit an answer for an Answer Short Question quiz
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Whether the answer was correct, and the correct word
 */
router.post("/quiz/answerShortQuestion/check", authenticateToken, quizController.checkAnswerShortQuestion);

/**
 * @swagger
 * /quiz/multipleChoice:
 *   get:
 *     tags: [Quiz]
 *     summary: Get a multiple choice quiz from your saved words
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A definition with 4 word options
 *       404:
 *         description: Need at least 4 saved words
 */
router.get("/quiz/multipleChoice", authenticateToken, quizController.multipleChoice);

/**
 * @swagger
 * /savedWords/dueForReview:
 *   get:
 *     tags: [Quiz]
 *     summary: Get saved words due for spaced-repetition review
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of words due for review
 */
router.get("/savedWords/dueForReview", authenticateToken, quizController.dueForReview);

module.exports = router;