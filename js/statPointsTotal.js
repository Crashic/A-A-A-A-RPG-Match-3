// Сколько всего очков характеристик положено герою: STAT_POINTS_PER_LEVEL за каждый уровень,
// начиная со 2-го (на 1-м уровне — ни одного).
function statPointsTotal(hero) {
  return STAT_POINTS_PER_LEVEL * Math.max(0, (hero.level || 1) - 1);
}
