// Боец-враг в начале боя: уровень и множители из js/zones.js (элита сильнее) и характеристики (enemyStats).
function createEnemyFighter(e) {
  const f = createFighter(e.name, e.level, e.hp * (e.elite ? ELITE_HP : 1), e.atk * (e.elite ? ELITE_ATK : 1));
  return applyStats(f, enemyStats(e));
}
