// Обычное оружие (одноручное) уровня level — награда сюжета.
function storyWeapon(level) {
  const item = rollItem(level, 'common');
  const pool = ITEM_BASES.filter(b => b.slot === 'weapon' && b.hands !== 2);
  if (!pool.length) return item;
  const base = pool[Math.floor(Math.random() * pool.length)];
  item.base = base.id;
  item.name = itemName(base, 'common', []);
  return item;
}
