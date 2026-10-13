// После изменения заданий: сохранить героя и перерисовать экран заданий (если открыт).
function saveQuests(hero) {
  saveSlot(getActiveSlot(), hero);
  if (document.getElementById('quests').classList.contains('active')) renderQuests();
  if (document.getElementById('journal').classList.contains('active')) renderJournal();
}
