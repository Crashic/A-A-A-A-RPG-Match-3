// Боевые характеристики от уровня. hpMul/atkMul — множители (у врагов из js/zones.js).
function combatStats(level, hpMul = 1, atkMul = 1) {
  const maxHp = Math.round((STAT_HP_BASE + STAT_HP_PER_LEVEL * (level - 1)) * hpMul);
  const attack = Math.max(1, Math.round((STAT_ATK_BASE + STAT_ATK_PER_LEVEL * (level - 1)) * atkMul));
  return {
    maxHp,
    attack,                                                    // урон за рубин
    shieldPerGem: Math.max(1, Math.round(attack * SHIELD_PER_ATK)),
    maxShield: Math.round(maxHp * SHIELD_MAX_SHARE),
    xpPerGem: Math.max(1, Math.round(mobXp(level, level) / 25)), // опыт за аметист
    goldPerGem: 1 + Math.floor(level / 10)                      // золото за топаз
  };
}
