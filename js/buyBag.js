// Купить сумку у Семёныча (typeId из BAG_TYPES) — в инвентарь, с подтверждением.
function buyBag(typeId) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const t = findById(BAG_TYPES, typeId);
  if ((hero.tape || 0) < t.price) { showToast('Не хватает изоленты. Семёныч в долг не даёт.'); return; }
  if ((hero.bag || []).length >= bagCapacity(hero)) { showToast('Инвентарь полон — сумку положить некуда. Иронично.'); return; }
  showConfirm('Купить «' + t.name + '» (' + t.size + ' ячеек) за ' + tapeText(t.price) + '?', 'Купить', () => {
    const h = loadSlot(getActiveSlot());
    h.tape -= t.price;
    addToBag(h, [makeBag(t.id)]);
    saveGear(h);
    showToast('«' + t.name + '» в инвентаре. Наденьте её — касанием.');
  }, 'orange');
}
