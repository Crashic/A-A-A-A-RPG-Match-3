// Новый ассортимент торговца для героя: SHOP_STOCK_SIZE вещей от уровня героя до +SHOP_LEVEL_UP.
// Записывает hero.shop = { items, level, wins } (сохранить героя — вызывающему).
function rollShopStock(hero) {
  const items = [];
  for (let i = 0; i < SHOP_STOCK_SIZE; i++)
    items.push(rollItem(hero.level + Math.floor(Math.random() * (SHOP_LEVEL_UP + 1)), shopRarity()));
  hero.shop = { items, level: hero.level, wins: hero.wins || 0 };
  return hero.shop;
}
