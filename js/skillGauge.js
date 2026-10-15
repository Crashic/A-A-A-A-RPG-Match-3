// Корешок талона навыка (макет «Агитпроп»): по столбику на каждую ману цены (1–2), мана наливается снизу цветом фишки,
// поверх — белая иконка фишки с тёмной обводкой и «есть/надо». mana — мана бойца ({ id: количество }).
// Возвращает { html, width } — ширину корешка ставят в --stub у кнопки.
function skillGauge(cost, mana) {
  const ids = Object.keys(cost || {}).slice(0, 2);
  const cols = ids.map(id => {
    const gem = findById(GEM_TYPES, id);
    const have = Math.min(mana[id] || 0, 99);
    const pct = Math.round(Math.min(1, have / cost[id]) * 100);
    return `<span class="skGauge" style="--gem:${gem.tile.bg};--gem-dark:${gem.tile.ink}"><i style="height:${pct}%"></i>` +
      `<svg viewBox="${gem.tile.vb}" aria-hidden="true" style="overflow:visible"><path d="${gem.tile.d}" fill="#fff" fill-rule="evenodd" stroke="${gem.tile.ink}" stroke-width="2.6" stroke-linejoin="round" paint-order="stroke"/></svg>` +
      `<b>${have}<small>/${cost[id]}</small></b></span>`;
  });
  return { html: '<span class="skCost skStub">' + cols.join('') + '</span>', width: ids.length ? 10 + ids.length * 36 + (ids.length - 1) * 3 : 0 };
}
