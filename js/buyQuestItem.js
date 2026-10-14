// Покупка квестового предмета у Семёныча (особый заказ сюжета): списать изоленту, положить в «Квестовое».
function buyQuestItem(id) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  const q = findById(QUEST_ITEMS, id);
  if (!hero || !q || hasQuestItem(hero, id)) return;
  if ((hero.tape || 0) < q.price) { showToast(tr("ui.Не хватает изоленты. Продайте что-нибудь — Семёныч в долг не даёт.")); return; }
  hero.tape -= q.price;
  hero.questItems = (hero.questItems || []).concat(id);
  saveSlot(slot, hero);
  vibrate([20, 30, 20]);
  showToast(tr("ui.Куплено: ") + q.name + tr("ui.. Лежит в «Квестовом»."), 2500);
  renderShop();
  storyEvent('buyQuest', id); // сюжет, акт 3
}
