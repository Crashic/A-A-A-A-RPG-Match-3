// Выбор расы: раса задаёт и свою фракцию (Пресса — фракция «Пресса»).
function pickRace(id) {
  const d = creation.draft;
  d.raceId = id;
  d.factionId = findById(RACES, id).factionId;
  renderCreateStep();
}
