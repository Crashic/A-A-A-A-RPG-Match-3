// Создаёт содержимое панели бойца (один раз): имя, строка уровня, полосы.
// Опыт и изоленту в бою не показываем (итог — в окне после боя). Слева у каждой полосы — значок одного размера: сердце у здоровья,
// у остальных — фишка, которая полосу пополняет (щит — Детали, мана — Металл, Травы и Плёнка,
// опыт — Документы, изолента — Радиация).
function buildFighterPanel(panel, isHero) {
  const row = (icon, bar) => `<div class="statRow">${icon}${bar}</div>`;
  const manaBars = MANA_COLORS.map(id =>
    row(gemMiniIcon(id), `<div class="bar mana ${id}" data-bar="${id}" data-tip-title="${GEM_EFFECTS[id].label.split(' — ')[0]} — ${tr('ui.мана')}" data-tip="${GEM_EFFECTS[id].text}"><i></i><span></span></div>`)).join('');
  panel.innerHTML =
    '<header class="fighterHead"><b data-f="name"></b><span data-f="info"></span></header>' +
    row(heartIcon(), tr("ui.<div class=\"bar hp\" data-bar=\"hp\" data-tip-title=\"Здоровье\" data-tip=\"Кончится — бой проигран. Фишки не лечат, лечат только навыки.\"><i></i><span></span></div>")) +
    row(gemMiniIcon('aquamarine'), tr("ui.<div class=\"bar shield\" data-bar=\"shield\" data-tip-title=\"Щит\" data-tip=\"Принимает урон первым. Копится от Деталей, не больше четверти здоровья.\"><i></i><span></span></div>")) +
    `<div class="manaRow">${manaBars}</div>` +
    '';
  panel.dataset.built = '1';
}
