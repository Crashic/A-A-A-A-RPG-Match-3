// Глоссарий · Характеристики (js/statsConfig.js, js/statNames.js): что делает каждая и как называется у разных рас.
function glossaryStats() {
  const out = [glossaryEntry('', tr("ui.Очки характеристик"), '', [
    tr("ui.Значение = база класса + ваши очки. За каждый уровень начиная со 2-го — ") + STAT_POINTS_PER_LEVEL + tr("ui. очков."),
    tr("ui.Раздать и перераспределить можно в любой момент вне боя: «Персонаж» → «+», «−» и круглая стрелка сброса.")])];
  const styles = [['council', tr("ui.Совет")], ['union', tr("ui.Союз")], ['under', tr("ui.Подземники")], ['press', tr("ui.Пресса")]];
  for (const s of STATS) {
    const names = styles.map(([id, who]) => who + ': ' + STAT_NAMES[id][s.id].name);
    out.push(glossaryEntry(iconTile(s.icon, s.color), s.name, tr("ui.В бою: ") + s.effect, [['list', names.join(' · ')]]));
  }
  out.push(glossaryEntry(iconTile('fist', 'var(--gem-ruby)'), INI_NAME, tr("ui.Инициатива · второстепенная, только со снаряжения"), [
    tr("ui.Решает, кто ходит первым. Поровну с врагом — орёл или решка. Иначе шанс первого хода 50 % ±") + INI_STEP_PCT + tr("ui. % за каждую единицу разницы (от ") + INI_MIN_PCT + tr("ui. до ") + INI_MAX_PCT + ' %).',
    tr("ui.У врагов — +1 за каждые ") + INI_ENEMY_PER_LEVELS + tr("ui. уровня, у элиты ещё +") + INI_ELITE_BONUS + '.',
    ['lore', tr("ui.Кто первым сказал «я тут стоял» — тот и стоял.")]]));
  return out;
}
