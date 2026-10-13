// Сколько свободных ячеек в надетых сумках героя.
function bagFreeSlots(hero) {
  return Math.max(0, bagCapacity(hero) - ((hero && hero.bag) || []).length);
}
