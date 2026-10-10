// Главное меню: «Начать игру» или «Продолжить», если в выбранной ячейке есть сохранение.
function renderMenu() {
  const n = getActiveSlot();
  const save = loadSlot(n);
  document.getElementById('btnStartLabel').textContent = save ? 'Продолжить' : 'Начать игру';
  document.getElementById('btnStartSub').textContent = save
    ? 'Ячейка ' + n + ': ' + save.name
    : 'Ячейка ' + n + ': новая игра';
}
