// Сбрасывает все розданные очки характеристик текущего героя (кнопка с круглой стрелкой). Вне боя (в бою — в режиме читов).
function resetStats() {
  if (statsLocked()) return;
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  hero.points = heroPoints({});
  saveSlot(slot, hero);
  vibrate(20);
  renderCharacter();
  refreshHeroInBattle();
}
