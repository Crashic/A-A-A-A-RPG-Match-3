// Взять задание с доски (index — номер в hero.quests.board), если взято меньше QUEST_ACTIVE_MAX.
function acceptQuest(index) {
  const hero = loadSlot(getActiveSlot());
  const q = hero && hero.quests;
  if (!q || !q.board[index]) return;
  if (q.active.length >= QUEST_ACTIVE_MAX) { showToast('Больше ' + QUEST_ACTIVE_MAX + ' заданий не унести. Профсоюз запрещает.'); return; }
  q.active.push(q.board.splice(index, 1)[0]);
  saveQuests(hero);
}
