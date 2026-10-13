// Взять задание с доски: list — 'board' (поручения) или 'daily' (ежедневные), index — номер в списке.
// Лимит — по категории задания (questLimit), заблокированные после отказа слоты тоже считаются (questSlotsUsed).
function acceptQuest(index, list = 'board') {
  const hero = loadSlot(getActiveSlot());
  const q = hero && hero.quests;
  const quest = q && q[list] && q[list][index];
  if (!quest) return;
  const max = questLimit(hero, quest.cat);
  if (questSlotsUsed(hero, quest.cat) >= max) {
    if (questLocks(hero, quest.cat).length) { showToast(QUEST_ABANDON_TEXT + tr("ui. Слот откроется через ") + timerText(questLocks(hero, quest.cat)[0].until) + '.', 3000); return; }
    const cat = findById(QUEST_CATEGORIES, quest.cat);
    showToast(tr("ui.Больше ") + max + ' ' + cat.gen + tr("ui. не унести. Профсоюз запрещает."));
    return;
  }
  q.active.push(q[list].splice(index, 1)[0]);
  saveQuests(hero);
}
