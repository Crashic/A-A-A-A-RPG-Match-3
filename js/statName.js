// Название характеристики statId для расы raceId: { name, tip, base } (base — «Сила», «Ловкость»…).
function statName(raceId, statId) {
  const stat = findById(STATS, statId);
  const style = STAT_NAMES[RACE_STAT_STYLE[raceId]];
  const own = style && style[statId];
  return { name: own ? own.name : stat.name, tip: own ? own.tip : '', base: stat.name };
}
