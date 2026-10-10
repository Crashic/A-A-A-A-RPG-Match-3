// «Начать игру» / «Продолжить»: берёт сохранение выбранной ячейки или создаёт новое.
// Самой игры пока нет — открывается экран-заглушка.
function startGame() {
  const n = getActiveSlot();
  const save = loadSlot(n) || createSlot(n);
  saveSlot(n, save);
  document.getElementById('gameInfo').textContent =
    save.name + ' (ячейка ' + n + '). Здесь скоро появится игра.';
  showScreen('game');
}
