const achievementsRepository = require("../repositories/achievementsRepository");

const MILESTONES = [5, 10, 25, 50, 100];

async function checkAndUnlock(customerId, currentWordCount) {
  if (!MILESTONES.includes(currentWordCount)) {
    return null;   // no milestone reached this time
  }

  const title = `${currentWordCount} words saved`;

  const alreadyUnlocked = await achievementsRepository.existsByTitle(customerId, title);
  if (alreadyUnlocked) {
    return null;
  }

  const description = `You've reached ${currentWordCount} saved words on your PTE journey!`;
  await achievementsRepository.insert(customerId, title, description);

  return { title, description };
}

async function getAchievements(customerId) {
  return await achievementsRepository.findByCustomer(customerId);
}

module.exports = { checkAndUnlock, getAchievements };