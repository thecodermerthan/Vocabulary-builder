const savedWordsService = require("../services/savedWordsService");

async function create(req, res) {
  try {
    const { word, definition, partOfSpeech, phonetic, example } = req.body;
    const result = await savedWordsService.saveWord(req.customer.customerId, {
      word, definition, partOfSpeech, phonetic, example
    });
    res.status(201).json(result);   // now includes insertedId AND newAchievement (if any)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAll(req, res) {
  try {
    const words = await savedWordsService.getSavedWords(req.customer.customerId);
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deletedCount = await savedWordsService.deleteWord(req.params.id, req.customer.customerId);
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Word not found" });
    }
    res.json({ deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { create, getAll, remove };