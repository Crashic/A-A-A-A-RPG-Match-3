// Экран игры (пока заглушка): показывает текущего персонажа.
function renderGame() {
  const n = getActiveSlot();
  const hero = loadSlot(n);
  document.getElementById('gameInfo').textContent = hero
    ? hero.name + ' — ' + describeCharacter(hero) + '. Здесь скоро появится игра.'
    : '';
}
