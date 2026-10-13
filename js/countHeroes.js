// Сколько персонажей создано на аккаунте.
function countHeroes() {
  let c = 0;
  for (let n = 1; n <= SLOT_COUNT; n++) if (loadSlot(n)) c++;
  return c;
}
