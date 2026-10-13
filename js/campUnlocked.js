// Открыт ли лагерь на аккаунте. Пока — сразу (CAMP_FREE_UNLOCK); потом — после цепочки заданий
// (её финал вызовет unlockCamp).
function campUnlocked() {
  return CAMP_FREE_UNLOCK || !!loadAccount().campUnlocked;
}
