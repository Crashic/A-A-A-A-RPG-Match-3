// Открывает глоссарий (из меню или из боя — между ходами). tab — раздел, по умолчанию последний открытый.
function openGlossary(tab) {
  if (match3 && match3.busy && battle && !battle.over) { showToast('Дождитесь конца хода', 1500); return; }
  if (tab) glossaryTab = tab;
  closeGemLegend();
  renderGlossary();
  showScreen('glossary');
}
