// Значок характеристики: плитка-иконка и число; подсказка — название расы и шуточное описание.
function statChip(raceId, statId, value) {
  const stat = findById(STATS, statId);
  const el = document.createElement('span');
  el.className = 'statChip';
  el.innerHTML = iconTile(stat.icon, stat.color) + '<b></b>';
  el.querySelector('b').textContent = value;
  attachTip(el, statName(raceId, statId).name, statTipText(raceId, statId));
  return el;
}
