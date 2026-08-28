const goalsService = require("../services/goalsService");

async function create(req, res) {
  try {
    const { targetWordCount, examDate } = req.body;
    await goalsService.setGoal(req.customer.customerId, targetWordCount, examDate);
    res.status(201).json({ message: "Goal set successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function progress(req, res) {
  try {
    const result = await goalsService.getProgress(req.customer.customerId);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { create, progress };