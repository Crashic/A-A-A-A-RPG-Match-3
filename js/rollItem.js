// Новый случайный предмет уровня level. rarity — id редкости (по умолчанию случайная, rollRarity).
// Предмет: { uid, base, rarity, level, req, name, main, mods: [{ id, v }], unique? }.
// main — свойство самой вещи (характеристика базы), mods — случайные свойства (у уникальных — свои).
// Если уникальных такого уровня нет — выпадает редкий.
function rollItem(level, rarity = rollRarity(false)) {
  level = Math.max(1, Math.min(MAX_LEVEL, Math.round(level)));
  const rand = n => Math.floor(Math.random() * n);
  const make = (base, rar, name, mods, unique) => ({
    uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    base: base.id, rarity: rar, level, req: Math.max(1, level - ITEM_REQ_BELOW),
    name, main: itemBaseValue(level), mods, unique
  });
  if (rarity === 'unique') {
    const pool = ITEM_UNIQUES.filter(u => u.minLevel <= level);
    if (pool.length) {
      const u = pool[rand(pool.length)];
      const top = itemAffixRange(level)[1];
      const mods = Object.entries(u.mods).map(([id, k]) => affixValue(id, Math.max(1, Math.round(top * k))));
      return make(findById(ITEM_BASES, u.base), 'unique', u.name, mods, u.id);
    }
    rarity = 'rare';
  }
  const base = ITEM_BASES[rand(ITEM_BASES.length)];
  const r = findById(ITEM_RARITIES, rarity);
  const count = r.affixes[0] + rand(r.affixes[1] - r.affixes[0] + 1);
  const ids = ITEM_AFFIXES.map(a => a.id).sort(() => Math.random() - 0.5).slice(0, count);
  const [lo, hi] = itemAffixRange(level);
  const mods = ids.map(id => affixValue(id, lo + rand(hi - lo + 1)));
  return make(base, rarity, itemName(base, rarity, ids), mods);
}
