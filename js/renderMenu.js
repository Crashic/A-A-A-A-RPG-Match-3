// Главное меню: блок текущего персонажа и кнопка «Начать игру» (нет персонажа) / «Продолжить».
function renderMenu() {
  const hero = loadSlot(getActiveSlot());
  document.getElementById('btnStartLabel').textContent = hero ? t('ui.Продолжить') : t('ui.Начать игру');
  const sub = document.getElementById('btnStartSub');
  sub.textContent = hero ? '' : t('ui.Создание персонажа');
  sub.hidden = !!hero;
  renderHeroCard();
}
