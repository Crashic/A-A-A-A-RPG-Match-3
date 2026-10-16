// Боец-герой в начале боя: как createFighter, но с характеристиками героя (heroStats → applyStats)
// и свойствами снаряжения (gearTotals): здоровье, шанс крита, изолента с фишек Изоленты и опыт с Документов.
function createHeroFighter(save) {
  const g = gearTotals(save);
  const f = createFighter(save.name, save.level);
  f.maxHp += Math.round(g.hp);
  applyStats(f, heroStats(save));
  f.critPct = Math.min(STAT_CRIT_MAX, f.critPct + g.crit);
  f.tapePerGem = Math.round(f.tapePerGem * (1 + g.tape / 100));
  f.xpPerGem = Math.max(1, Math.round(f.xpPerGem * (1 + g.xp / 100)));
  f.ini = Math.round(g.ini || 0); // «Ресурс личной наглости» — со снаряжения и из реестра
  const pg = paragonBonus(); // реестр: проценты к здоровью, удару, криту, изоленте, опыту
  f.maxHp = Math.round(f.maxHp * (1 + pg.hpPct / 100));
  f.hp = f.maxHp;
  f.attack = Math.max(1, Math.round(f.attack * (1 + pg.atkPct / 100)));
  f.critPct = Math.min(STAT_CRIT_MAX, f.critPct + pg.critPct);
  f.ini += pg.ini;
  f.tapePerGem = Math.round(f.tapePerGem * (1 + pg.tapePct / 100));
  f.xpPerGem = Math.max(1, Math.round(f.xpPerGem * (1 + pg.xpPct / 100)));
  return f;
}
