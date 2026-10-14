// Цена гнезда для сумки номер n (с нуля): первые BAG_NESTS_START — BAG_NEST_EARLY_PRICES (первое бесплатно), дальше — BAG_NEST_PRICES.
function bagNestPrice(n) {
  return n < BAG_NESTS_START ? BAG_NEST_EARLY_PRICES[n] : BAG_NEST_PRICES[n - BAG_NESTS_START];
}
