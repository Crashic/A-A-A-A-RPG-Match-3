// Выбор расы: обычная раса задаёт и свою фракцию; Пресса остаётся при текущей фракции (или нейтральной).
function pickRace(id) {
  const d = creation.draft;
  const race = findById(RACES, id);
  d.raceId = id;
  if (race.factionId) d.factionId = race.factionId;
  renderCreateStep();
}
