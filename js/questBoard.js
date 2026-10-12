// Доска объявлений героя: hero.quests = { board, active }. Дополняет доску новыми заданиями до
// QUEST_BOARD_SIZE (rollQuest). Возвращает true, если что-то изменилось (героя нужно сохранить).
function questBoard(hero) {
  hero.quests = hero.quests || { board: [], active: [] };
  const q = hero.quests;
  q.board = q.board || [];
  q.active = q.active || [];
  let changed = false;
  while (q.board.length < QUEST_BOARD_SIZE) { q.board.push(rollQuest(hero)); changed = true; }
  return changed;
}
