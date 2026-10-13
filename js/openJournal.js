// Открывает журнал заданий (экран «Задания»): обновляет доску (новый день — ежедневные) и показывает.
function openJournal() {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  if (questBoard(hero)) saveSlot(slot, hero);
  closeBattleMenu();
  hideTip();
  renderJournal();
  showScreen('journal');
}
