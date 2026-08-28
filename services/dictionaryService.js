const dictionaryRepository = require("../repositories/dictionaryRepository");

async function getWordDefinition(word) {
  const data = await dictionaryRepository.fetchDefinition(word);

  if (!data || !data.entries || data.entries.length === 0) {
    throw new Error("Word not found");
  }

  const entry = data.entries[0];
  const sense = entry.senses[0];
  const pronunciation = entry.pronunciations && entry.pronunciations[0];

  return {
    word: data.word,
    phonetic: pronunciation ? pronunciation.text : "",
    partOfSpeech: entry.partOfSpeech,
    definition: sense.definition,
    example: (sense.examples && sense.examples[0]) || ""
  };
}

module.exports = { getWordDefinition };


//the raw API response is deeply nested and messy; your service layer's job is to simplify it into
//  a clean shape your own app will actually use later (for saving to savedWords).