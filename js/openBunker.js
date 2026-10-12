// Открывает экран «Бункер» (из меню карты).
function openBunker() {
  if (!loadSlot(getActiveSlot())) return;
  hideTip();
  renderBunker();
  showScreen('bunker');
}
