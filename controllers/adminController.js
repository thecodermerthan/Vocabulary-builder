const adminService = require("../services/adminService");

async function getAllSavedWords(req, res) {
  try {
    const results = await adminService.getAllSavedWordsWithCustomers();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllSavedWords };