// Сколько свободных очков характеристик у героя: всего (statPointsTotal) минус розданные.
function statPointsFree(hero) {
  const used = Object.values(heroPoints(hero)).reduce((a, b) => a + b, 0);
  return Math.max(0, statPointsTotal(hero) - used);
}
