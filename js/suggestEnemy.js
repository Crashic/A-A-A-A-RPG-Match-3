// Враг по умолчанию для героя: в стартовой локации — самый сильный обычный не выше его уровня,
// иначе первый враг стартовой локации.
function suggestEnemy(hero) {
  const zone = startZoneOf(hero.raceId, hero.classId);
  let best = zone.enemies[0];
  for (const e of zone.enemies)
    if (!e.elite && e.level <= hero.level && e.level >= best.level) best = e;
  return best.id;
}
