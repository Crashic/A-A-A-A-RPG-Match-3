// Текст подсказки характеристики: обычное название, шуточное описание расы и что она делает в бою.
function statTipText(raceId, statId) {
  const n = statName(raceId, statId);
  const stat = findById(STATS, statId);
  return n.base + '. ' + (n.tip ? n.tip + ' ' : '') + tr("ui.В бою: ") + stat.effect + '.';
}
