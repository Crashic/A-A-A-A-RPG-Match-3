// Вкладка «Подробно» в характеристиках: что они дают в бою — здоровье, атака, крит,
// запас и приток маны, щит за Деталь и сила лечения (как у героя в начале боя, createHeroFighter).
function renderStatDetails(box, hero) {
  const f = createHeroFighter(hero);
  const pct = n => (n > 0 ? '+' : '') + Math.round(n) + ' %';
  const rows = [
    [heartIcon(), 'Здоровье', f.maxHp, 'Выносливость: +' + STAT_STA_HP + ' за очко сверх ' + STAT_BASE + '.'],
    [gemMiniIcon('ruby'), 'Атака (урон за Топливо)', f.attack, 'Сила: +' + STAT_STR_PCT + ' % за очко сверх ' + STAT_BASE + '.'],
    [iconTile('compass', 'var(--gem-topaz)'), 'Шанс крита ×' + STAT_CRIT_MULT, f.critPct.toFixed(1).replace('.', ',') + ' %', 'Ловкость: ' + String(STAT_AGI_CRIT).replace('.', ',') + ' % за очко, не больше ' + STAT_CRIT_MAX + ' %.'],
    [gemMiniIcon('sapphire'), 'Запас каждой маны', f.manaMax, 'Интеллект: +1 за ' + STAT_INT_MANA_EVERY + ' очка сверх ' + STAT_BASE + '.'],
    [gemMiniIcon('amethyst'), 'Мана с фишек', pct(f.manaPct), 'Интеллект: +' + STAT_INT_PCT + ' % за очко сверх ' + STAT_BASE + '.'],
    [gemMiniIcon('aquamarine'), 'Щит за Деталь', f.shieldPerGem + ' (до ' + f.maxShield + ')', 'Дух усиливает щит за Детали; щит — не больше четверти здоровья.'],
    [gemMiniIcon('emerald'), 'Лечение навыками', pct(f.healPct), 'Дух: +' + STAT_SPI_PCT + ' % за очко сверх ' + STAT_BASE + '.']
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
