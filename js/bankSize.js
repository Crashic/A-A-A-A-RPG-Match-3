// Сколько ячеек в банке героя: база + купленные сумки.
function bankSize(hero) {
  return BANK_BASE_SLOTS + ((hero.bank && hero.bank.bags) || 0) * BANK_BAG_SIZE;
}
