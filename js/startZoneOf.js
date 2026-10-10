// Стартовая локация персонажа: у расы своя (zones.js, start); Пресса начинает в первой локации
// фракции своего класса (Совет — «Рассвет», Союз — «Три Канистры»), Хронист — на «Переходе».
function startZoneOf(raceId, classId) {
  if (raceId === 'press') {
    const side = mapSide('press', 'press', classId);
    return ZONES.find(z => (side ? z.factionId === side : !z.factionId)) || ZONES[0];
  }
  return ZONES.find(z => z.start.includes(raceId)) || ZONES[0];
}
