// Главное меню: «Начать игру», пока в выбранной ячейке нет персонажа, иначе «Продолжить».
function renderMenu() {
  const n = getActiveSlot();
  const hero = loadSlot(n);
  document.getElementById('btnStartLabel').textContent = hero ? 'Продолжить' : 'Начать игру';
  document.getElementById('btnStartSub').textContent = hero
    ? hero.name + ' · ' + describeCharacter(hero)
    : 'Создание персонажа';
}
