// Стартовая локация персонажа: у расы своя (zones.js, start) — первая локация её фракции (ур. 1–15);
// Пресса начинает в первой локации фракции своего класса, нейтральный Хронист — в первой локации Совета.
function startZoneOf(raceId, classId) {
  if (raceId === 'press') {
    const side = mapSide('press', 'press', classId);
    return ZONES.find(z => z.factionId === (side || 'council')) || ZONES[0];
  }
  return ZONES.find(z => z.start.includes(raceId)) || ZONES[0];
}
