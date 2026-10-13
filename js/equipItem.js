// Надеть предмет из сумки (index — номер в hero.bag). Старая вещь из этого слота возвращается в сумку.
// Нельзя, если уровень героя ниже требуемого или идёт бой (кроме режима читов — statsLocked).
function equipItem(index) {
  const hero = loadSlot(getActiveSlot());
  const item = hero && hero.bag && hero.bag[index];
  if (!item) return false;
  if (isBagItem(item)) return wearBag(index);
  if (statsLocked()) { showToast('В бою не переодеваются. Даже в пустошах.'); return false; }
  if (hero.level < item.req) { showToast('Нужен ' + item.req + '-й уровень'); return false; }
  const key = gearSlotFor(hero, item);
  if (!key) return false;
  hero.gear = hero.gear || {};
  const old = hero.gear[key];
  hero.gear[key] = item;
  hero.bag.splice(index, 1);
  if (old) hero.bag.push(old);
  saveGear(hero);
  return true;
}
