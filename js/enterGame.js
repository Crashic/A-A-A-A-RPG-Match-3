// Открывает экран боя: продолжает сохранённый бой или начинает новый с последним выбранным врагом.
// replace — заменить текущий экран в истории (после создания/заставки), а не добавлять новый.
function enterGame(replace = false) {
  showScreen('game'); // история: бой — игровой экран поверх игрового меню (navPush), replace больше не нужен
  const slot = getActiveSlot();
  const save = loadSlot(slot);
  startBattle(save && save.lastEnemy, loadBattle(slot)); // незаконченный бой — продолжить
}
