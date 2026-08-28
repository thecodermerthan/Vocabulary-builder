const express = require("express");
const router = express.Router();
const goalsController = require("../controllers/goalsController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/goals", authenticateToken, goalsController.create);
router.get("/goals/progress", authenticateToken, goalsController.progress);

module.exports = router;