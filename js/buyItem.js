// Купить вещь с прилавка (index — номер в hero.shop.items): списать изоленту, положить в сумку.
function buyItem(index) {
  const hero = loadSlot(getActiveSlot());
  const item = hero && hero.shop && hero.shop.items[index];
  if (!item) return false;
  const price = buyPrice(item);
  if ((hero.tape || 0) < price) { showToast(tr("ui.Не хватает изоленты. Семёныч в долг не даёт.")); return false; }
  if ((hero.bag || []).length >= bagCapacity(hero)) { showToast(tr("ui.Сумка полна")); return false; }
  hero.tape -= price;
  hero.shop.items.splice(index, 1);
  addToBag(hero, [item]);
  saveGear(hero);
  return true;
}
