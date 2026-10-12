// Сумма свойств всего надетого снаряжения героя: { str, agi, sta, int, spi, hp, crit, tape, xp }.
function gearTotals(hero) {
  const t = {};
  for (const a of ITEM_AFFIXES) t[a.id] = 0;
  const gear = (hero && hero.gear) || {};
  for (const key of GEAR_KEYS) {
    if (!gear[key]) continue;
    for (const m of itemMods(gear[key])) t[m.id] = (t[m.id] || 0) + m.v;
  }
  return t;
}
