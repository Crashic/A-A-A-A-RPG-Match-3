// Сколько стоит «Завезите новое» — внеочередное обновление прилавка (растёт с уровнем героя).
function rerollPrice(hero) {
  return Math.round((10 + hero.level * hero.level / 3) * SHOP_REROLL_MUL);
}
