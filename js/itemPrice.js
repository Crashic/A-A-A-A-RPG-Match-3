// Цена предмета в белой изоленте (для торговца): растёт с уровнем и редкостью.
function itemPrice(item) {
  if (isBagItem(item)) return Math.max(25, Math.round(((findById(BAG_TYPES, item.bagType) || {}).price || 100) / 4));
  const r = findById(ITEM_RARITIES, item.rarity);
  return Math.round((10 + item.level * item.level / 3) * (r ? r.price : 1));
}
