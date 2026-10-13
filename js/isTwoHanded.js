// Двуручное ли оружие (база с hands: 2).
function isTwoHanded(item) {
  const base = item && findById(ITEM_BASES, item.base);
  return !!(base && base.hands === 2);
}
