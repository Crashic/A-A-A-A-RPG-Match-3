// «Начать игру» / «Продолжить»: без персонажа в выбранной ячейке — создание персонажа, иначе — игра.
function startGame() {
  const n = getActiveSlot();
  const hero = loadSlot(n);
  if (!hero) { openCharacterCreation(n, 'game'); return; }
  saveSlot(n, hero); // обновляет дату последней игры
  enterGame();
}
