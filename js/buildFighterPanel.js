// Создаёт содержимое панели бойца (один раз): имя, строка уровня, полосы.
// У игрока ещё опыт и изолента. Слева у каждой полосы — значок одного размера: сердце у здоровья,
// у остальных — фишка, которая полосу пополняет (щит — Детали, мана — Металл, Травы и Плёнка,
// опыт — Документы, изолента — Радиация).
function buildFighterPanel(panel, isHero) {
  const row = (icon, bar) => `<div class="statRow">${icon}${bar}</div>`;
  const manaBars = MANA_COLORS.map(id =>
    row(gemMiniIcon(id), `<div class="bar mana ${id}" data-bar="${id}" title="${GEM_EFFECTS[id].text}"><i></i><span></span></div>`)).join('');
  panel.innerHTML =
    '<header class="fighterHead"><b data-f="name"></b><span data-f="info"></span></header>' +
    row(heartIcon(), '<div class="bar hp" data-bar="hp" title="Здоровье. Лечат только навыки"><i></i><span></span></div>') +
    row(gemMiniIcon('aquamarine'), '<div class="bar shield" data-bar="shield" title="Щит. Дают Детали"><i></i><span></span></div>') +
    `<div class="manaRow">${manaBars}</div>` +
    (isHero
      ? row(gemMiniIcon('pearl'), '<div class="bar xp" data-bar="xp" title="Опыт. Дают Документы"><i></i><span></span></div>') +
        row(gemMiniIcon('topaz'), '<div class="fighterTape" data-f="tape" title="Изолента. Даёт Радиация"></div>')
      : '');
  panel.dataset.built = '1';
}
