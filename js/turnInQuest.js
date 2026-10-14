// Сдать выполненное задание (index — номер в hero.quests.active): опыт (grantXp), изолента и вещь
// уровня задания в сумку. Если вещь не влезает в сумку — сдать нельзя.
function turnInQuest(index) {
  const hero = loadSlot(getActiveSlot());
  const q = hero && hero.quests && hero.quests.active[index];
  if (!q || q.have < q.need) return;
  const item = q.reward.item ? rollItem(q.level, q.reward.item) : null;
  if (item && (hero.bag || []).length >= bagCapacity(hero)) { showToast(tr("ui.Освободите место в сумке под награду")); return; }
  if (item) addToBag(hero, [item]);
  hero.tape = (hero.tape || 0) + q.reward.tape;
  const ups = grantXp(hero, q.reward.xp);
  if (q.deliver) hero.questItems = (hero.questItems || []).filter(id => id !== q.deliver); // отнесли квестовый предмет
  hero.quests.active.splice(index, 1);
  hero.quests.done = (hero.quests.done || 0) + 1;
  saveQuests(hero);
  vibrate([30, 40, 30]);
  updateNotifyBadges();
  storyEvent('turnin', q.uid); // сюжет, акт 4
  if (ups) showLevelUp(hero.level, ups);
  showToast(tr("ui.Задание сдано") + (item ? ': ' + item.name : '') + (ups ? tr("ui. · новый уровень!") : ''), 3000);
}
