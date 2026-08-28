const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goalsController");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Set or update your study goal
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetWordCount: { type: number }
 *               examDate: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Goal set successfully
 */
router.post("/goals", authenticateToken, goalsController.create);

/**
 * @swagger
 * /goals/progress:
 *   get:
 *     summary: Get your progress toward your study goal
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progress details
 *       404:
 *         description: No goal set yet
 */
router.get("/goals/progress", authenticateToken, goalsController.progress);


module.exports = router;