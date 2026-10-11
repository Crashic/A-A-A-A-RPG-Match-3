// Очки, которые игрок сам раздал по характеристикам: { str, agi, sta, int, spi } (у старых персонажей — нули).
// Если розданных больше, чем положено (персонаж из 0.3.9 раздал очки на 1-м уровне), очки обнуляются.
function heroPoints(hero) {
  const p = {};
  for (const s of STATS) p[s.id] = (hero && hero.points && hero.points[s.id]) || 0;
  const used = Object.values(p).reduce((a, b) => a + b, 0);
  if (hero && used > statPointsTotal(hero)) for (const s of STATS) p[s.id] = 0;
  return p;
}
