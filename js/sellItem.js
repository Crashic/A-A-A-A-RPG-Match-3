// Продать вещь из сумки торговцу (index — номер в hero.bag) по itemPrice.
function sellItem(index) {
  const hero = loadSlot(getActiveSlot());
  const item = hero && hero.bag && hero.bag[index];
  if (!item) return;
  hero.tape = (hero.tape || 0) + itemPrice(item);
  hero.bag.splice(index, 1);
  saveGear(hero);
}
