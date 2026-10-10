// Переход к выбору класса. Если выбранный ранее класс не из списка фракции — выбирается первый доступный.
function openClassStep() {
  const d = creation.draft;
  const list = factionClassList(d.factionId, d.raceId);
  const allowed = raceClasses(d.raceId, d.factionId);
  if (!list.some(c => c.id === d.classId)) {
    const first = list.find(c => allowed[c.id]) || list[0];
    d.classId = first ? first.id : null;
  }
  creation.step = 'class';
  renderCreateStep();
}
