// Создаёт содержимое панели бойца (один раз): имя, строка уровня, полосы.
// У игрока ещё опыт и изолента. Слева у каждой полосы — фишка, которая её пополняет
// (здоровье — Травы, щит — Детали, мана — Металл и Плёнка, опыт — Документы, изолента — Радиация).
function buildFighterPanel(panel, isHero) {
  const row = (gem, bar) => `<div class="statRow">${gemMiniIcon(gem)}${bar}</div>`;
  const manaBars = MANA_COLORS.map(id =>
    row(id, `<div class="bar mana ${id}" data-bar="${id}" title="${GEM_EFFECTS[id].text}"><i></i><span></span></div>`)).join('');
  panel.innerHTML =
    '<header class="fighterHead"><b data-f="name"></b><span data-f="info"></span></header>' +
    row('emerald', '<div class="bar hp" data-bar="hp" title="Здоровье. Лечат Травы"><i></i><span></span></div>') +
    row('aquamarine', '<div class="bar shield" data-bar="shield" title="Щит. Дают Детали"><i></i><span></span></div>') +
    `<div class="manaRow">${manaBars}</div>` +
    (isHero
      ? row('pearl', '<div class="bar xp" data-bar="xp" title="Опыт. Дают Документы"><i></i><span></span></div>') +
        row('topaz', '<div class="fighterTape" data-f="tape" title="Изолента. Даёт Радиация"></div>')
      : '');
  panel.dataset.built = '1';
}
