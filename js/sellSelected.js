// Продать торговцу все выделенные вещи сумки (bagSel).
function sellSelected() {
  if (!bagSel) return;
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  const picked = (hero.bag || []).filter(i => bagSel.uids.has(i.uid) && bagSelectable(i));
  if (!picked.length) return;
  hero.tape = (hero.tape || 0) + picked.reduce((a, i) => a + itemPrice(i), 0);
  hero.bag = hero.bag.filter(i => !picked.includes(i));
  bagSel = null;
  saveGear(hero);
  showToast(tr("ui.Продано: ") + picked.length + '. ' + tr("ui.Семёныч доволен, вы — не очень."));
  storyEvent('sell');
}
