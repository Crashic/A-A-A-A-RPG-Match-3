// Куда надеть предмет: ключ слота в hero.gear (GEAR_KEYS). Кольца, оружие и руны — в первый свободный
// слот своего вида, если свободных нет — в первый (старая вещь вернётся в сумку).
function gearSlotFor(hero, item) {
  const base = findById(ITEM_BASES, item.base);
  if (!base) return null;
  const keys = GEAR_KEYS.filter(k => k.replace(/\d+$/, '') === base.slot);
  const gear = hero.gear || {};
  return keys.find(k => !gear[k]) || keys[0] || null;
}
