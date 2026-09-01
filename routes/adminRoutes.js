const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");

/**
 * @swagger
 * /admin/savedWords:
 *   get:
 *     tags: [Admin]
 *     summary: Get every saved word across all users, with owner info (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved words with customer name/email
 *       403:
 *         description: Not an admin
 */
router.get("/admin/savedWords", authenticateToken, authorizeRole("admin"), adminController.getAllSavedWords);

module.exports = router;