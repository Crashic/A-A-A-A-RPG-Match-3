// Выбросить предмет из сумки (index — номер в hero.bag).
function dropItem(index) {
  const hero = loadSlot(getActiveSlot());
  if (!hero || !hero.bag || !hero.bag[index]) return;
  hero.bag.splice(index, 1);
  saveGear(hero);
}
