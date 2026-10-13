// Сколько ячеек в инвентаре героя: сумма размеров надетых сумок.
function bagCapacity(hero) {
  return heroPacks(hero).worn.reduce((a, b) => a + (b ? b.size : 0), 0);
}
