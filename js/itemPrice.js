// Цена предмета в белой изоленте (для торговца): растёт с уровнем и редкостью.
function itemPrice(item) {
  const r = findById(ITEM_RARITIES, item.rarity);
  return Math.round((10 + item.level * item.level / 3) * (r ? r.price : 1));
}
