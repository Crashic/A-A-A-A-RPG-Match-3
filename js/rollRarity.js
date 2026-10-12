// Случайная редкость предмета по весам ITEM_RARITIES; у элиты (elite) редкие вещи выпадают чаще.
// Возвращает id редкости: 'common' | 'magic' | 'rare' | 'unique'.
function rollRarity(elite) {
  const w = r => r.weight * (elite && r.id !== 'common' ? ITEM_ELITE_RARITY_MUL : 1);
  let n = Math.random() * ITEM_RARITIES.reduce((a, r) => a + w(r), 0);
  for (const r of ITEM_RARITIES) { n -= w(r); if (n < 0) return r.id; }
  return 'common';
}
