// Вкладка «Подробно» в характеристиках: что они дают в бою — здоровье, атака, крит,
// запас и приток маны, щит за Деталь и сила лечения (как у героя в начале боя, createHeroFighter).
function renderStatDetails(box, hero) {
  const f = createHeroFighter(hero);
  const pct = n => (n > 0 ? '+' : '') + Math.round(n) + ' %';
  const rows = [
    [heartIcon(), tr("ui.Здоровье"), f.maxHp, tr("ui.Выносливость: +") + STAT_STA_HP + tr("ui. за очко сверх ") + STAT_BASE + '.'],
    [gemMiniIcon('ruby'), tr("ui.Атака (урон за Топливо)"), f.attack, tr("ui.Сила: +") + STAT_STR_PCT + tr("ui. % за очко сверх ") + STAT_BASE + '.'],
    [iconTile('compass', 'var(--gem-topaz)'), tr("ui.Шанс крита ×") + STAT_CRIT_MULT, f.critPct.toFixed(1).replace('.', ',') + ' %', tr("ui.Ловкость: ") + String(STAT_AGI_CRIT).replace('.', ',') + tr("ui. % за очко, не больше ") + STAT_CRIT_MAX + ' %.'],
    [gemMiniIcon('topaz'), tr("ui.Запас каждой маны"), f.manaMax, tr("ui.Интеллект: +1 за ") + STAT_INT_MANA_EVERY + tr("ui. очка сверх ") + STAT_BASE + '.'],
    [gemMiniIcon('amethyst'), tr("ui.Мана с фишек"), pct(f.manaPct), tr("ui.Интеллект: +") + STAT_INT_PCT + tr("ui. % за очко сверх ") + STAT_BASE + '.'],
    [gemMiniIcon('aquamarine'), tr("ui.Щит за Деталь"), f.shieldPerGem + tr("ui. (до ") + f.maxShield + ')', tr("ui.Дух усиливает щит за Детали; щит — не больше четверти здоровья.")],
    [gemMiniIcon('emerald'), tr("ui.Лечение навыками"), pct(f.healPct), tr("ui.Дух: +") + STAT_SPI_PCT + tr("ui. % за очко сверх ") + STAT_BASE + '.'],
    [iconTile('fist', 'var(--gem-ruby)'), INI_NAME, f.ini, tr("ui.Инициатива: кто ходит первым. Только со снаряжения. Поровну с врагом — монетка, иначе ±") + INI_STEP_PCT + tr("ui. % к шансу первого хода за единицу разницы.")]
  ];
  for (const [icon, label, value, tip] of rows) {
    const row = document.createElement('div');
    row.className = 'statRowBig detail';
    row.innerHTML = '<span class="detailIcon">' + icon + '</span><span class="statLabel"></span><b class="statVal"></b>';
    row.querySelector('.statLabel').textContent = label;
    row.querySelector('.statVal').textContent = value;
    attachTip(row.querySelector('.statLabel'), label, tip);
    box.appendChild(row);
  }
}
