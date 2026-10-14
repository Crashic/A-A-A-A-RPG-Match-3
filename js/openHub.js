// Открывает игровое меню (экран hub).
function openHub() {
  closeBattleMenu();
  hideTip();
  if (!loadSlot(getActiveSlot())) { renderMenu(); showScreen('menu', false); return; }
  renderHub();
  showScreen('hub');
}
