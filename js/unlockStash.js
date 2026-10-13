// Открывает общий склад для аккаунта (награда за задание).
function unlockStash() {
  const acc = loadAccount();
  acc.stashUnlocked = true;
  saveAccount(acc);
}
