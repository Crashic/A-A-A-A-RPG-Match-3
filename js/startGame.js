// «Начать игру» / «Продолжить»: если в выбранной ячейке нет персонажа — создание персонажа,
// иначе — в игру.
function startGame() {
  const n = getActiveSlot();
  const hero = loadSlot(n);
  if (!hero) { openCharacterCreation(n, 'game'); return; }
  saveSlot(n, hero); // обновляет дату последней игры
  renderGame();
  showScreen('game');
}
