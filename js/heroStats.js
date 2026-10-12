// Итоговые характеристики героя: база класса + розданные очки + прибавка из «Читера» + снаряжение. { str, agi, sta, int, spi }.
function heroStats(hero) {
  const base = CLASS_STATS[hero.classId] || {};
  const pts = heroPoints(hero);
  const cheat = cheatBonus(hero);
  const gear = gearTotals(hero);
  const out = {};
  for (const s of STATS) out[s.id] = (base[s.id] || STAT_BASE) + pts[s.id] + cheat[s.id] + (gear[s.id] || 0);
  return out;
}
