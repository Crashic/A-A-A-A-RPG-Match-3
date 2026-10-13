// Снять предмет из слота снаряжения key в сумку. Нельзя, если сумка полна или идёт бой (кроме читов).
function unequipItem(key) {
  const hero = loadSlot(getActiveSlot());
  const item = hero && hero.gear && hero.gear[key];
  if (!item) return false;
  if (statsLocked()) { showToast('В бою не переодеваются. Даже в пустошах.'); return false; }
  hero.bag = hero.bag || [];
  if (hero.bag.length >= bagCapacity(hero)) { showToast('Сумка полна'); return false; }
  delete hero.gear[key];
  hero.bag.push(item);
  saveGear(hero);
  return true;
}
