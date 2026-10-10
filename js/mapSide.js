// Чья карта у персонажа: его фракция; у Прессы — фракция выбранного класса
// (Совет или Союз), у Свободного Хрониста — null (нейтральный, все локации).
function mapSide(raceId, factionId, classId) {
  if (raceId !== 'press') return factionId;
  const bonus = raceClasses('press')[classId];
  return bonus ? bonus.side : null;
}
