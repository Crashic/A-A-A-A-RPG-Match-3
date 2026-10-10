// Бонус персонажа к фишке (в процентах): класс + раса из таблиц автора, например Инженер-Руинник +1% к Арматуре.
function gemBonus(hero, gemId) {
  if (!hero) return 0;
  const bonus = raceClasses(hero.raceId, hero.factionId)[hero.classId];
  return bonus && bonus.gem === gemId ? bonus.pct : 0;
}
