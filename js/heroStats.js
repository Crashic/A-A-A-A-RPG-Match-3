// Итоговые характеристики героя: база класса + розданные очки. { str, agi, sta, int, spi }.
function heroStats(hero) {
  const base = CLASS_STATS[hero.classId] || {};
  const pts = heroPoints(hero);
  const out = {};
  for (const s of STATS) out[s.id] = (base[s.id] || STAT_BASE) + pts[s.id];
  return out;
}
