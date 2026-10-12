// Прилавок торговца для героя: если ассортимента нет, у героя новый уровень или прошло
// SHOP_REFRESH_WINS побед — завозится новый (rollShopStock). Возвращает true, если обновился
// (тогда героя нужно сохранить).
function shopStock(hero) {
  const s = hero.shop;
  if (s && Array.isArray(s.items) && s.level === hero.level && (hero.wins || 0) - (s.wins || 0) < SHOP_REFRESH_WINS) return false;
  rollShopStock(hero);
  return true;
}
