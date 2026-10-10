// Враг по умолчанию: самый сильный не выше уровня героя (обычный, не элита).
function suggestEnemy(level) {
  let best = ZONES[0].enemies[0];
  for (const zone of ZONES)
    for (const e of zone.enemies)
      if (!e.elite && e.level <= level && e.level >= best.level) best = e;
  return best.id;
}
