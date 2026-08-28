const express = require("express");
const router = express.Router();
const savedWordsController = require("../controllers/savedWordsController");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * @swagger
 * /savedWords:
 *   post:
 *     summary: Save a word to your personal list
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word: { type: string }
 *               definition: { type: string }
 *               partOfSpeech: { type: string }
 *               phonetic: { type: string }
 *               example: { type: string }
 *     responses:
 *       201:
 *         description: Word saved (may include newAchievement)
 *       400:
 *         description: Word already saved
 */
router.post("/savedWords", authenticateToken, savedWordsController.create);

/**
 * @swagger
 * /savedWords:
 *   get:
 *     summary: Get all words you've saved
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved words
 */
router.get("/savedWords", authenticateToken, savedWordsController.getAll);

/**
 * @swagger
 * /savedWords/{id}:
 *   delete:
 *     summary: Delete one of your saved words
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word deleted
 *       404:
 *         description: Word not found
 */
router.delete("/savedWords/:id", authenticateToken, savedWordsController.remove);


module.exports = router;