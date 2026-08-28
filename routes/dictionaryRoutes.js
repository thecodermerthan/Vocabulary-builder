const express = require("express");
const router = express.Router();
const dictionaryController = require("../controllers/dictionaryController");

router.get("/dictionary/:word", dictionaryController.lookup);

module.exports = router;