// Цель акта 6 «Не по уставу»: враг 5-го уровня стартовой локации (нет такого — второй враг). { zone, enemy }.
function storyTarget5(hero) {
  const zone = startZoneOf(hero.raceId, hero.classId);
  if (!zone) return null;
  return { zone, enemy: zone.enemies.find(e => e.level === 5) || zone.enemies[1] || zone.enemies[0] };
}
