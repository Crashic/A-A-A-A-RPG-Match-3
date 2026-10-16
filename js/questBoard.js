// Доска объявлений героя: hero.quests = { board, daily, day, active, done }. Старые задания без
// категории становятся поручениями. Дополняет поручения до QUEST_BOARD_SIZE; в новый день (questDayKey)
// вешает свежие ежедневные (QUEST_DAILY_BOARD_SIZE), а взятые невыполненные ежедневные сгорают.
// Возвращает true, если что-то изменилось (героя нужно сохранить).
function questBoard(hero) {
  hero.quests = hero.quests || {};
  const q = hero.quests;
  q.board = q.board || [];
  q.daily = q.daily || [];
  q.active = q.active || [];
  let changed = false;
  for (const x of q.board.concat(q.active)) if (!x.cat) { x.cat = 'errand'; changed = true; }
  while (q.board.length < QUEST_BOARD_SIZE) { q.board.push(rollQuest(hero, 'errand')); changed = true; }
  const day = questDayKey();
  if (q.day !== day) {
    q.day = day;
    q.daily = [];
    for (let i = 0; i < QUEST_DAILY_BOARD_SIZE; i++) q.daily.push(rollQuest(hero, 'daily'));
    const before = q.active.length;
    q.active = q.active.filter(x => x.cat !== 'daily' || x.have >= x.need);
    const burned = before - q.active.length;
    if (burned) setTimeout(() => questToast('burn', { title: burned + ' ' + plural(burned, tr("ui.задание"), tr("ui.задания"), tr("ui.заданий")) }), 400); // «СГОРЕЛО»
    changed = true;
  }
  return changed;
}
