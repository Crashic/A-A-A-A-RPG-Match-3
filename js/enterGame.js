// Открывает экран игры и запускает новое поле.
// replace — заменить текущий экран в истории (после создания/заставки), а не добавлять новый.
function enterGame(replace = false) {
  renderGame();
  if (replace) {
    history.replaceState({ screen: 'game' }, '');
    showScreen('game', false);
  } else {
    showScreen('game');
  }
  startMatch3();
}
