// Куда надеть предмет: ключ слота в hero.gear (GEAR_KEYS). Кольца, оружие и руны — в первый свободный
// слот своего вида, если свободных нет — в первый (старая вещь вернётся в сумку).
function gearSlotFor(hero, item) {
  const base = findById(ITEM_BASES, item.base);
  if (!base) return null;
  if (base.hands === 2) return 'weapon1'; // двуручное — всегда в weapon1 (видно в обеих руках)
  const keys = GEAR_KEYS.filter(k => k.replace(/\d+$/, '') === base.slot);
  const gear = hero.gear || {};
  if (base.slot === 'weapon' && isTwoHanded(gear.weapon1)) return 'weapon1'; // сравнивать с двуручным
  return keys.find(k => !gear[k]) || keys[0] || null;
}
