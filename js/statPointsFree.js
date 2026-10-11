// Сколько свободных очков характеристик у героя: STAT_POINTS_PER_LEVEL за каждый уровень минус розданные.
function statPointsFree(hero) {
  const used = Object.values(heroPoints(hero)).reduce((a, b) => a + b, 0);
  return Math.max(0, STAT_POINTS_PER_LEVEL * (hero.level || 1) - used);
}
