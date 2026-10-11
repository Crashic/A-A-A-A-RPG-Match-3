// Что дают характеристики в бою (числа — js/statsConfig.js):
// { attackPct, critPct, hpAdd, manaMaxAdd, manaPct, spiritPct }.
function statBonuses(stats) {
  return {
    attackPct: (stats.str - STAT_BASE) * STAT_STR_PCT,
    critPct: Math.min(STAT_CRIT_MAX, Math.max(0, stats.agi * STAT_AGI_CRIT)),
    hpAdd: (stats.sta - STAT_BASE) * STAT_STA_HP,
    manaMaxAdd: Math.floor((stats.int - STAT_BASE) / STAT_INT_MANA_EVERY),
    manaPct: (stats.int - STAT_BASE) * STAT_INT_PCT,
    spiritPct: (stats.spi - STAT_BASE) * STAT_SPI_PCT
  };
}
