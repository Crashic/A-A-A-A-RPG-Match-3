// После изменения снаряжения или сумки: сохранить героя, перерисовать «Персонажа»,
// в бою (режим читов) — сразу пересчитать героя.
function saveGear(hero) {
  saveSlot(getActiveSlot(), hero);
  renderCharacter();
  refreshHeroInBattle();
}
