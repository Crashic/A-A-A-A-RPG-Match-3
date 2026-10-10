// Какие классы показывать на экране выбора класса: все классы рас фракции
// (у нейтральной Прессы — три уникальных пресс-класса). Порядок — как в CLASSES.
function factionClassList(factionId, raceId) {
  const ids = new Set();
  if (raceId === 'press' && !factionId) {
    ['chronicler', 'archivist', 'bard'].forEach(id => ids.add(id));
  } else {
    for (const race of RACES) {
      if (race.factionId && race.factionId !== factionId) continue;
      Object.keys(raceClasses(race.id, factionId)).forEach(id => ids.add(id));
    }
  }
  return CLASSES.filter(c => ids.has(c.id));
}
