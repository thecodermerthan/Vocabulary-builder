const express = require("express");
const router = express.Router();
const dictionaryController = require("../controllers/dictionaryController");

/**
 * @swagger
 * /dictionary/{word}:
 *   get:
 *     tags: [Dictionary]
 *     summary: Look up a word's definition
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word definition found
 *       404:
 *         description: Word not found
 */
router.get("/dictionary/:word", dictionaryController.lookup);

module.exports = router;