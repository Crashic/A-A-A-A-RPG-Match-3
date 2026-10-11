// Глоссарий · Характеристики (js/statsConfig.js, js/statNames.js): что делает каждая и как называется у разных рас.
function glossaryStats() {
  const out = [glossaryEntry('', 'Очки характеристик', '', [
    'Значение = база класса + ваши очки. За каждый уровень — ' + STAT_POINTS_PER_LEVEL + ' очков, на 1-м тоже.',
    'Раздать и перераспределить можно в любой момент вне боя: «Персонаж» → «+», «−» и круглая стрелка сброса.'])];
  const styles = [['council', 'Совет'], ['union', 'Союз'], ['under', 'Подземники'], ['press', 'Пресса']];
  for (const s of STATS) {
    const names = styles.map(([id, who]) => who + ': ' + STAT_NAMES[id][s.id].name);
    out.push(glossaryEntry(iconTile(s.icon, s.color), s.name, 'В бою: ' + s.effect, [['list', names.join(' · ')]]));
  }
  return out;
}
