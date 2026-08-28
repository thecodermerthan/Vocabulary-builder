async function fetchDefinition(word) {
  const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/en/${word}`);

  if (!response.ok) {
    return null;   // word not found
  }

  const data = await response.json();
  return data;
}

module.exports = { fetchDefinition };

//Notice: this file's job is identical in spirit to customerRepository.js — it's the only place that talks to
//  an external data source (in this case, the Free Dictionary API instead of MongoDB).