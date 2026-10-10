// Может ли персонаж попасть в локацию: локации своей стороны (mapSide) и нейтральные;
// Свободный Хронист — во все.
function zoneAllowed(hero, zone) {
  if (!zone.factionId || !hero) return true;
  const side = mapSide(hero.raceId, hero.factionId, hero.classId);
  return !side || zone.factionId === side;
}
