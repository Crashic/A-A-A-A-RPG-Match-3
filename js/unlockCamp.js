// Открывает лагерь для всего аккаунта (награда за цепочку заданий).
function unlockCamp() {
  const acc = loadAccount();
  acc.campUnlocked = true;
  saveAccount(acc);
  setupCampButtons();
}
