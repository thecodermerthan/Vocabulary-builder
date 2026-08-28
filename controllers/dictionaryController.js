const dictionaryService = require("../services/dictionaryService");

async function lookup(req, res) {
  try {
    const result = await dictionaryService.getWordDefinition(req.params.word);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { lookup };