// Враги, подходящие для заданий герою: из доступных ему локаций (zoneAllowed), не выше уровня героя
// на up и не «серые» (за них нет опыта). elite — true: только элита, false: без элиты.
function questEnemies(hero, elite, up) {
  const out = [];
  for (const zone of ZONES) {
    if (!zoneAllowed(hero, zone)) continue;
    for (const e of zone.enemies)
      if (!!e.elite === elite && e.level <= hero.level + up && (e.level > grayLevel(hero.level) || hero.level >= MAX_LEVEL))
        out.push({ zone, enemy: e });
  }
  return out;
}
