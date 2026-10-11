// Критический удар героя: с шансом fighter.critPct урон умножается на STAT_CRIT_MULT.
// Возвращает { amount, crit }.
function rollCrit(fighter, amount) {
  const crit = !!fighter.critPct && Math.random() * 100 < fighter.critPct;
  return { amount: crit ? Math.round(amount * STAT_CRIT_MULT) : amount, crit };
}
