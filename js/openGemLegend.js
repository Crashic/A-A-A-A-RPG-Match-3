// Подсказка «Фишки»: какая фишка что даёт в бою (значок, камень, ресурс, эффект).
// Открывается кнопкой «? Фишки» в бою и сама — в первом бою (settings.gemLegendSeen).
function openGemLegend() {
  const list = document.getElementById('gemLegendList');
  list.innerHTML = '';
  for (const gem of GEM_TYPES) {
    const eff = GEM_EFFECTS[gem.id];
    const row = document.createElement('div');
    row.className = 'legendRow';
    row.innerHTML = gemMiniIcon(gem.id) + '<div><b></b><span></span></div>';
    row.querySelector('b').textContent = eff.short + ' · ' + eff.label.split(' — ')[0];
    row.querySelector('span').textContent = eff.text;
    list.appendChild(row);
  }
  document.getElementById('gemLegendNote').textContent =
    'Фишки срабатывают для того, кто ходит. Ряд из ' + EXTRA_TURN_RUN + '+ или ' + EXTRA_TURN_GROUP + '+ вместе (крестом) — ещё ход.';
  document.getElementById('gemLegend').classList.add('open');
}
