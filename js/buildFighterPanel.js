// Создаёт содержимое панели бойца (один раз) по макету «Агитпроп»: слева аватар (у героя — плитка расы, у врага — силуэт)
// со значком класса и штампом хода поперёк, справа имя, уровень, полоса здоровья и полоса щита; ниже — плашки трёх ман
// (плитка фишки и цифра). Опыт и изоленту в бою не показываем (итог — в окне после боя).
function buildFighterPanel(panel, isHero) {
  const manaChips = MANA_COLORS.map(id =>
    `<div class="statRow">${gemMiniIcon(id)}<div class="bar mana ${id}" data-bar="${id}" data-tip-title="${GEM_EFFECTS[id].label.split(' — ')[0]} — ${tr('ui.мана')}" data-tip="${GEM_EFFECTS[id].text}"><i></i><span></span></div></div>`).join('');
  panel.innerHTML =
    '<div class="fpTop"><div class="fpAva"><span class="fpPortrait" data-f="portrait"></span><span class="fpBadge" data-f="badge"></span><span class="fpStamp" data-f="stamp"></span></div>' +
    '<div class="fpInfo"><header class="fighterHead"><b data-f="name"></b><span data-f="info"></span></header>' +
    tr("ui.<div class=\"bar hp\" data-bar=\"hp\" data-tip-title=\"Здоровье\" data-tip=\"Кончится — бой проигран. Фишки не лечат, лечат только навыки.\"><i></i><span></span></div>") +
    tr("ui.<div class=\"bar shield\" data-bar=\"shield\" data-tip-title=\"Щит\" data-tip=\"Принимает урон первым. Копится от Деталей, не больше четверти здоровья.\"><i></i><span></span></div>") +
    '</div></div>' +
    `<div class="manaRow">${manaChips}</div>`;
  panel.dataset.built = '1';
}
