// Боец-герой в начале боя: как createFighter, но с характеристиками героя (heroStats → applyStats)
// и свойствами снаряжения (gearTotals): здоровье, шанс крита, изолента с Радиации и опыт с Документов.
function createHeroFighter(save) {
  const g = gearTotals(save);
  const f = createFighter(save.name, save.level);
  f.maxHp += Math.round(g.hp);
  applyStats(f, heroStats(save));
  f.critPct = Math.min(STAT_CRIT_MAX, f.critPct + g.crit);
  f.tapePerGem = Math.round(f.tapePerGem * (1 + g.tape / 100));
  f.xpPerGem = Math.max(1, Math.round(f.xpPerGem * (1 + g.xp / 100)));
  return f;
}
