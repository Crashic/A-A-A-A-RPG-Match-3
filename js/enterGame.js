// Открывает экран боя и начинает бой с последним выбранным врагом (или подходящим по уровню).
// replace — заменить текущий экран в истории (после создания/заставки), а не добавлять новый.
function enterGame(replace = false) {
  if (replace) {
    history.replaceState({ screen: 'game' }, '');
    showScreen('game', false);
  } else {
    showScreen('game');
  }
  const save = loadSlot(getActiveSlot());
  startBattle(save && save.lastEnemy);
}
