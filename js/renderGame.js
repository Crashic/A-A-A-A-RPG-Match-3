// Шапка экрана игры: имя текущего персонажа и его описание.
function renderGame() {
  const hero = loadSlot(getActiveSlot());
  document.getElementById('gameHeroName').textContent = hero ? hero.name : '';
  document.getElementById('gameHeroInfo').textContent = hero ? describeCharacter(hero) : '';
}
