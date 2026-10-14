// Меняет розданные очки характеристики statId на delta (+1 / −1) у текущего героя.
// Вне боя (в бою — только в режиме читов, statsLocked); нельзя уйти ниже базы класса и потратить больше свободных очков.
function changeStat(statId, delta) {
  if (statsLocked()) return;
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const pts = heroPoints(hero);
  if (delta > 0 && statPointsFree(hero) < delta) return;
  if (pts[statId] + delta < 0) return;
  pts[statId] += delta;
  hero.points = pts;
  saveSlot(slot, hero);
  vibrate(10);
  renderCharacter();
  renderLevelUpStats(); // открыто окно нового уровня — обновить
  if (delta > 0) storyEvent('stat'); // сюжет, акт 2
  updateNotifyBadges();
  refreshHeroInBattle(); // режим читов в бою — сразу в силе
}
