// Выбор фракции (Совет или Союз) на экране происхождения. Повторное касание снимает выбор.
// Раса другой фракции сбрасывается.
function pickFaction(id) {
  const d = creation.draft;
  d.factionId = d.factionId === id ? null : id;
  const race = findById(RACES, d.raceId);
  if (race && race.factionId !== d.factionId) d.raceId = null;
  renderCreateStep();
}
