// Очки, которые игрок сам раздал по характеристикам: { str, agi, sta, int, spi } (у старых персонажей — нули).
function heroPoints(hero) {
  const p = {};
  for (const s of STATS) p[s.id] = (hero && hero.points && hero.points[s.id]) || 0;
  return p;
}
