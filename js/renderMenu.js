// Главное меню: «Начать игру», пока в выбранной ячейке нет персонажа, иначе «Продолжить»
// с именем персонажа под кнопкой.
function renderMenu() {
  const hero = loadSlot(getActiveSlot());
  document.getElementById('btnStartLabel').textContent = hero ? 'Продолжить' : 'Начать игру';
  document.getElementById('btnStartSub').textContent = hero ? '' : 'Создание персонажа';
  document.getElementById('btnStartSub').hidden = !!hero;
  const name = document.getElementById('heroCaption');
  name.textContent = hero ? hero.name : '';
  name.hidden = !hero;
}
