// Открывает экран боя: продолжает сохранённый бой или начинает новый с последним выбранным врагом.
// replace — заменить текущий экран в истории (после создания/заставки), а не добавлять новый.
function enterGame(replace = false) {
  if (replace) {
    history.replaceState({ screen: 'game' }, '');
    showScreen('game', false);
  } else {
    showScreen('game');
  }
  const slot = getActiveSlot();
  const save = loadSlot(slot);
  startBattle(save && save.lastEnemy, loadBattle(slot)); // незаконченный бой — продолжить
}
