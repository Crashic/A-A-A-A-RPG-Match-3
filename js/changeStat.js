// Меняет розданные очки характеристики statId на delta (±1, ±10 с Shift) у текущего героя; false — не вышло.
// Вне боя (в бою — только в режиме читов, statsLocked); нельзя уйти ниже базы класса и потратить больше свободных очков.
function changeStat(statId, delta) {
  if (statsLocked()) return false;
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return false;
  const pts = heroPoints(hero);
  if (delta > 0 && statPointsFree(hero) < delta) return false;
  if (pts[statId] + delta < 0) return false;
  pts[statId] += delta;
  hero.points = pts;
  saveSlot(slot, hero);
  vibrate(10);
  renderCharacter();
  renderLevelUpStats(); // открыто окно нового уровня — обновить
  if (delta > 0) storyEvent('stat'); // сюжет, акт 2
  updateNotifyBadges();
  refreshHeroInBattle(); // режим читов в бою — сразу в силе
  return true;
}
