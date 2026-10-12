// Отказаться от взятого задания (index — номер в hero.quests.active), с подтверждением.
function abandonQuest(index) {
  const hero = loadSlot(getActiveSlot());
  const q = hero && hero.quests && hero.quests.active[index];
  if (!q) return;
  showConfirm('Отказаться от задания «' + q.title + '»? Прогресс пропадёт.', 'Отказаться', () => {
    const h = loadSlot(getActiveSlot());
    h.quests.active.splice(index, 1);
    saveQuests(h);
  });
}
