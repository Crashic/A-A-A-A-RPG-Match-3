// Открыт ли общий склад лагеря (пока — сразу, STASH_FREE_UNLOCK; потом — после задания, unlockStash).
function stashUnlocked() {
  return STASH_FREE_UNLOCK || !!loadAccount().stashUnlocked;
}
