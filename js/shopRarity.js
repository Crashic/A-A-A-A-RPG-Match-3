// Редкость вещи на прилавке по SHOP_RARITY_WEIGHTS.
function shopRarity() {
  const list = Object.entries(SHOP_RARITY_WEIGHTS);
  let n = Math.random() * list.reduce((a, [, w]) => a + w, 0);
  for (const [id, w] of list) { n -= w; if (n < 0) return id; }
  return 'common';
}
