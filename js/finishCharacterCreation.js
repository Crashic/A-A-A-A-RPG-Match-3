// «Создать»: сохраняет персонажа в ячейку и делает её текущей.
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
  showToast('Персонаж «' + hero.name + '» создан');
  const returnTo = creation.returnTo;
  creation = null;
  if (returnTo === 'game') {
    // экран создания заменяется игрой: «Назад» из игры ведёт в меню
    history.replaceState({ screen: 'game' }, '');
    renderGame();
    showScreen('game', false);
  } else {
    goBack();
  }
}
