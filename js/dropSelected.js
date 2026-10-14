// Выбросить все выделенные вещи сумки (bagSel).
function dropSelected() {
  if (!bagSel) return;
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  const before = (hero.bag || []).length;
  hero.bag = (hero.bag || []).filter(i => !(bagSel.uids.has(i.uid) && bagSelectable(i)));
  const n = before - hero.bag.length;
  bagSel = null;
  saveGear(hero);
  if (n) showToast(tr("ui.Выброшено: ") + n + '.');
}
