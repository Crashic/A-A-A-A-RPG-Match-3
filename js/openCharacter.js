// Открывает экран «Персонаж» (из меню или из меню боя).
function openCharacter() {
  if (match3 && match3.busy && battle && !battle.over) { showToast(tr("ui.Дождитесь конца хода"), 1500); return; }
  closeBattleMenu();
  closeBattleResult();
  hideTip();
  renderCharacter();
  showScreen('character');
}
