// Боец-герой в начале боя: как createFighter, но с характеристиками героя (heroStats → applyStats).
function createHeroFighter(save) {
  return applyStats(createFighter(save.name, save.level), heroStats(save));
}
