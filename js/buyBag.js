// Купить сумку у Семёныча (typeId из BAG_TYPES) — в инвентарь, с подтверждением.
function buyBag(typeId) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const t = findById(BAG_TYPES, typeId);
  if ((hero.tape || 0) < t.price) { showToast(tr("ui.Не хватает изоленты. Семёныч в долг не даёт.")); return; }
  if ((hero.bag || []).length >= bagCapacity(hero)) { showToast(tr("ui.Инвентарь полон — сумку положить некуда. Иронично.")); return; }
  showConfirm(tr("ui.Купить «") + t.name + '» (' + t.size + tr("ui. ячеек) за ") + tapeText(t.price) + '?', tr("ui.Купить"), () => {
    const h = loadSlot(getActiveSlot());
    h.tape -= t.price;
    addToBag(h, [makeBag(t.id)]);
    saveGear(h);
    showToast('«' + t.name + tr("ui.» в инвентаре. Наденьте её — касанием."));
  }, 'orange');
}
