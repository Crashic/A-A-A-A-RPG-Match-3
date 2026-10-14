// Уровни обычных врагов локации (без элиты и боссов): { min, max }.
function zoneRange(zone) {
  const lv = zone.enemies.filter(e => !e.elite && !e.boss).map(e => e.level);
  return lv.length ? { min: Math.min(...lv), max: Math.max(...lv) } : { min: zone.min, max: zone.max };
}
