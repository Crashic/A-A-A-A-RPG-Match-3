// Открывает экран «Доска объявлений» (из бункера и меню карты): дополняет доску (questBoard).
function openQuests() {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  if (questBoard(hero)) saveSlot(slot, hero);
  hideTip();
  renderQuests();
  showScreen('quests');
}
