// Стартовая локация расы (для Прессы — по фракции). Возвращает зону из ZONES.
function startZoneOf(raceId, factionId) {
  if (raceId === 'press') return findById(ZONES, PRESS_START[factionId || 'none']);
  return ZONES.find(z => z.start.includes(raceId)) || ZONES[0];
}
