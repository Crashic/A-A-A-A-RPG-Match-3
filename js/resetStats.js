// Сбрасывает все розданные очки характеристик текущего героя (кнопка с круглой стрелкой). Только вне боя.
function resetStats() {
  if (battle && !battle.over) return;
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  hero.points = heroPoints({});
  saveSlot(slot, hero);
  vibrate(20);
  renderCharacter();
}
