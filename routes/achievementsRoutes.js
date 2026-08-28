const express = require("express");
const router = express.Router();
const achievementsController = require("../controllers/achievementsController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/achievements", authenticateToken, achievementsController.getAll);

module.exports = router;