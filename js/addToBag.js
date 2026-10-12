// Кладёт предметы в сумку героя (hero.bag, не больше BACKPACK_SLOTS). Возвращает { added, lost } —
// что поместилось и что пришлось оставить в пустошах.
function addToBag(hero, items) {
  hero.bag = hero.bag || [];
  const added = [], lost = [];
  for (const it of items) {
    if (hero.bag.length < BACKPACK_SLOTS) { hero.bag.push(it); added.push(it); }
    else lost.push(it);
  }
  return { added, lost };
}
