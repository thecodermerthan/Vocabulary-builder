const adminRepository = require("../repositories/adminRepository");

async function getAllSavedWordsWithCustomers() {
  return await adminRepository.findAllSavedWordsWithCustomers();
}

module.exports = { getAllSavedWordsWithCustomers };