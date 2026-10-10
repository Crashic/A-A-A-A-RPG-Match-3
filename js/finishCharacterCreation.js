// «Создать»: сохраняет персонажа, делает его текущим и показывает заставку, после неё — игра.
function finishCharacterCreation() {
  const d = creation.draft;
  const hero = {
    name: d.name.trim(),
    classId: d.classId,
    genderId: d.genderId,
    raceId: d.raceId,
    factionId: d.factionId
  };
  createSlot(creation.slot, hero);
  setActiveSlot(creation.slot);
  creation = null;
  // экран создания заменяется заставкой: «Назад» с неё ведёт туда, откуда начали создание
  history.replaceState({ screen: 'intro' }, '');
  showScreen('intro', false);
  playIntro(hero, () => enterGame(true));
}
