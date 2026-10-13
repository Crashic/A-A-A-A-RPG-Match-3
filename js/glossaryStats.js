// Глоссарий · Характеристики (js/statsConfig.js, js/statNames.js): что делает каждая и как называется у разных рас.
function glossaryStats() {
  const out = [glossaryEntry('', 'Очки характеристик', '', [
    'Значение = база класса + ваши очки. За каждый уровень начиная со 2-го — ' + STAT_POINTS_PER_LEVEL + ' очков.',
    'Раздать и перераспределить можно в любой момент вне боя: «Персонаж» → «+», «−» и круглая стрелка сброса.'])];
  const styles = [['council', 'Совет'], ['union', 'Союз'], ['under', 'Подземники'], ['press', 'Пресса']];
  for (const s of STATS) {
    const names = styles.map(([id, who]) => who + ': ' + STAT_NAMES[id][s.id].name);
    out.push(glossaryEntry(iconTile(s.icon, s.color), s.name, 'В бою: ' + s.effect, [['list', names.join(' · ')]]));
  }
  out.push(glossaryEntry(iconTile('fist', 'var(--gem-ruby)'), INI_NAME, 'Инициатива · второстепенная, только со снаряжения', [
    'Решает, кто ходит первым. Поровну с врагом — орёл или решка. Иначе шанс первого хода 50 % ±' + INI_STEP_PCT + ' % за каждую единицу разницы (от ' + INI_MIN_PCT + ' до ' + INI_MAX_PCT + ' %).',
    'У врагов — +1 за каждые ' + INI_ENEMY_PER_LEVELS + ' уровня, у элиты ещё +' + INI_ELITE_BONUS + '.',
    ['lore', 'Кто первым сказал «я тут стоял» — тот и стоял.']]));
  return out;
}
