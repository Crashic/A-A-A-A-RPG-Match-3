// Сколько ячеек в инвентаре героя: сумма размеров надетых сумок; без сумок — HANDS_SIZE «в руках».
function bagCapacity(hero) {
  return heroHasBag(hero) ? heroPacks(hero).worn.reduce((a, b) => a + (b ? b.size : 0), 0) : HANDS_SIZE;
}
