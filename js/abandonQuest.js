// Отказаться от взятого задания (index — номер в hero.quests.active), с предупреждением.
// Поручение или ежедневное: слот этой категории блокируется на QUEST_ABANDON_LOCK_MIN минут (hero.quests.locks).
function abandonQuest(index, onDone) {
  const hero = loadSlot(getActiveSlot());
  const q = hero && hero.quests && hero.quests.active[index];
  if (!q) return;
  const lock = q.cat === 'errand' || q.cat === 'daily';
  showConfirm(tr("ui.Отказаться от задания «") + q.title + tr("ui.»? Прогресс пропадёт.") +
    (lock ? tr("ui. Заказчик обидится: слот будет закрыт на ") + QUEST_ABANDON_LOCK_MIN + tr("ui. минут.") : ''), tr("ui.Отказаться"), () => {
    const h = loadSlot(getActiveSlot());
    h.quests.active.splice(index, 1);
    if (lock) { questLocks(h); h.quests.locks.push({ cat: q.cat, until: Date.now() + QUEST_ABANDON_LOCK_MIN * 60000 }); }
    saveQuests(h);
    if (onDone) onDone();
  });
}
