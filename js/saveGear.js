// После изменения снаряжения, сумки или прилавка: сохранить героя, перерисовать открытый экран
// («Персонаж» или «Торговец»), в бою (режим читов) — сразу пересчитать героя.
function saveGear(hero) {
  saveSlot(getActiveSlot(), hero);
  if (document.getElementById('shop').classList.contains('active')) renderShop();
  else renderCharacter();
  refreshHeroInBattle();
}
