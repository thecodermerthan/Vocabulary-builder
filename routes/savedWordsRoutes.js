const express = require("express");
const router = express.Router();
const savedWordsController = require("../controllers/savedWordsController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/savedWords", authenticateToken, savedWordsController.create);
router.get("/savedWords", authenticateToken, savedWordsController.getAll);
router.delete("/savedWords/:id", authenticateToken, savedWordsController.remove);

module.exports = router;