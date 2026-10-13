// Сколько заданий категории cat герой может держать взятыми (ежедневные — по уровню, QUEST_DAILY_LIMITS).
function questLimit(hero, cat) {
  if (cat === 'daily') return QUEST_DAILY_LIMITS.find(([lvl]) => hero.level >= lvl)[1];
  return findById(QUEST_CATEGORIES, cat).max;
}
