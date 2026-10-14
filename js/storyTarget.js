// Цель первого сюжетного задания: первый враг стартовой локации героя. Возвращает { zone, enemy }.
function storyTarget(hero) {
  const zone = startZoneOf(hero.raceId, hero.classId);
  return zone ? { zone, enemy: zone.enemies[0] } : null;
}
