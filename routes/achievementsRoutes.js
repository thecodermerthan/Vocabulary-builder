const express = require("express");
const router = express.Router();
const achievementsController = require("../controllers/achievementsController");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * @swagger
 * /achievements:
 *   get:
 *     summary: Get your unlocked achievements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of achievements
 */
router.get("/achievements", authenticateToken, achievementsController.getAll);

module.exports = router;