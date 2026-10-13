// Действующие блокировки слотов заданий категории cat (после отказа): [{ cat, until }], просроченные убираются.
function questLocks(hero, cat) {
  const q = hero.quests || {};
  q.locks = (q.locks || []).filter(l => l.until > Date.now());
  return cat ? q.locks.filter(l => l.cat === cat) : q.locks;
}
