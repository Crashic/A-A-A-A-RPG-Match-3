// Боец-герой в начале боя: как createFighter, но с характеристиками (heroStats → statBonuses):
// атака, здоровье, щит за Детали, запас и приток маны, шанс крита, сила лечения навыков.
function createHeroFighter(save) {
  const f = createFighter(save.name, save.level);
  const b = statBonuses(heroStats(save));
  f.attack = Math.max(1, Math.round(f.attack * (1 + b.attackPct / 100)));
  f.maxHp = Math.max(1, f.maxHp + b.hpAdd);
  f.hp = f.maxHp;
  f.maxShield = Math.round(f.maxHp * SHIELD_MAX_SHARE);
  f.shieldPerGem = Math.max(1, Math.round(f.attack * SHIELD_PER_ATK * (1 + b.spiritPct / 100)));
  f.manaMax = Math.max(10, MANA_MAX + b.manaMaxAdd);
  f.manaPct = b.manaPct;
  f.critPct = b.critPct;
  f.healPct = b.spiritPct;
  return f;
}
