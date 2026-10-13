// Надеть предмет из сумки (index — номер в hero.bag). key — в какой слот (для одноручного оружия:
// 'weapon1' левая / 'weapon2' правая), по умолчанию — gearSlotFor. Старые вещи возвращаются в сумку.
// Двуручное занимает обе руки: снимаются оба оружия (нужно место в сумке). Одноручное вместо двуручного —
// двуручное уходит в сумку. Нельзя, если уровень ниже требуемого или идёт бой (кроме читов — statsLocked).
function equipItem(index, key) {
  const hero = loadSlot(getActiveSlot());
  const item = hero && hero.bag && hero.bag[index];
  if (!item) return false;
  if (isBagItem(item)) return wearBag(index);
  if (statsLocked()) { showToast('В бою не переодеваются. Даже в пустошах.'); return false; }
  if (hero.level < item.req) { showToast('Нужен ' + item.req + '-й уровень'); return false; }
  hero.gear = hero.gear || {};
  const gear = hero.gear;
  const base = findById(ITEM_BASES, item.base);
  let off = []; // что снимается в сумку
  if (base && base.slot === 'weapon') {
    if (isTwoHanded(item)) { key = 'weapon1'; off = [gear.weapon1, gear.weapon2]; }
    else {
      if (heroTwoHanded(hero)) { off = [gear.weapon1]; delete gear.weapon1; key = key || 'weapon1'; }
      key = key || gearSlotFor(hero, item);
      off.push(gear[key]);
    }
  } else {
    key = key || gearSlotFor(hero, item);
    if (!key) return false;
    off = [gear[key]];
  }
  off = off.filter(Boolean);
  if (hero.bag.length - 1 + off.length > bagCapacity(hero)) { showToast('В сумке нет места для снятого'); return false; }
  hero.bag.splice(index, 1);
  if (isTwoHanded(item)) { delete gear.weapon1; delete gear.weapon2; }
  gear[key] = item;
  hero.bag.push(...off);
  saveGear(hero);
  return true;
}
