// Выбор фракции на экране происхождения. Повторное касание снимает выбор
// (Пресса без фракции — нейтральная). Раса другой фракции сбрасывается.
function pickFaction(id) {
  const d = creation.draft;
  d.factionId = d.factionId === id ? null : id;
  const race = findById(RACES, d.raceId);
  if (race && race.factionId && race.factionId !== d.factionId) d.raceId = null;
  if (race && race.factionId && !d.factionId) d.raceId = null;
  renderCreateStep();
}
