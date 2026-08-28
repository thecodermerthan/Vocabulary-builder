const achievementsService = require("../services/achievementsService");

async function getAll(req, res) {
  try {
    const achievements = await achievementsService.getAchievements(req.customer.customerId);
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAll };