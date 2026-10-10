// Стартовая локация расы (Пресса начинает на нейтральном «Переходе»). Возвращает зону из ZONES.
function startZoneOf(raceId) {
  return ZONES.find(z => z.start.includes(raceId)) || ZONES[0];
}
