// Итоговые характеристики героя: база класса + розданные очки + прибавка из «Читера» + снаряжение + реестр (paragonBonus). { str, agi, sta, int, spi }.
function heroStats(hero) {
  const base = CLASS_STATS[hero.classId] || {};
  const pts = heroPoints(hero);
  const cheat = cheatBonus(hero);
  const gear = gearTotals(hero);
  const out = {};
  const pg = paragonBonus(); // «Реестр Героев и Пострадавших» — общий для аккаунта
  for (const s of STATS) out[s.id] = (base[s.id] || STAT_BASE) + pts[s.id] + cheat[s.id] + (gear[s.id] || 0) + (pg[s.id] || 0);
  return out;
}
