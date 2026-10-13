// Снять предмет из слота снаряжения key в сумку. Нельзя, если сумка полна или идёт бой (кроме читов).
function unequipItem(key) {
  const hero = loadSlot(getActiveSlot());
  if (key === 'weapon2' && hero && heroTwoHanded(hero)) key = 'weapon1'; // двуручное видно в обеих руках
  const item = hero && hero.gear && hero.gear[key];
  if (!item) return false;
  if (statsLocked()) { showToast(tr("ui.В бою не переодеваются. Даже в пустошах.")); return false; }
  hero.bag = hero.bag || [];
  if (hero.bag.length >= bagCapacity(hero)) { showToast(tr("ui.Сумка полна")); return false; }
  delete hero.gear[key];
  hero.bag.push(item);
  saveGear(hero);
  return true;
}
