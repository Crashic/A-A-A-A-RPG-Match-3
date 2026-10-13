// Взять задание с доски: list — 'board' (поручения) или 'daily' (ежедневные), index — номер в списке.
// Лимит — по категории задания (questLimit).
function acceptQuest(index, list = 'board') {
  const hero = loadSlot(getActiveSlot());
  const q = hero && hero.quests;
  const quest = q && q[list] && q[list][index];
  if (!quest) return;
  const max = questLimit(hero, quest.cat);
  if (q.active.filter(x => x.cat === quest.cat).length >= max) {
    const cat = findById(QUEST_CATEGORIES, quest.cat);
    showToast('Больше ' + max + ' ' + cat.gen + ' не унести. Профсоюз запрещает.');
    return;
  }
  q.active.push(q[list].splice(index, 1)[0]);
  saveQuests(hero);
}
