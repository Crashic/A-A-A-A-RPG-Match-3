// Надета ли у героя хоть одна сумка (иначе вещи «в руках», HANDS_SIZE).
function heroHasBag(hero) {
  return heroPacks(hero).worn.some(b => b);
}
