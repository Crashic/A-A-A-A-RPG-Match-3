// Создаёт содержимое панели бойца (один раз): имя, строка уровня, полосы.
// У игрока ещё опыт и золото.
function buildFighterPanel(panel, isHero) {
  const manaBars = MANA_COLORS.map(id =>
    `<div class="bar mana ${id}" data-bar="${id}" title="Мана"><i></i><span></span></div>`).join('');
  panel.innerHTML =
    '<header class="fighterHead"><b data-f="name"></b><span data-f="info"></span></header>' +
    '<div class="bar hp" data-bar="hp"><i></i><span></span></div>' +
    '<div class="bar shield" data-bar="shield"><i></i><span></span></div>' +
    `<div class="manaRow">${manaBars}</div>` +
    (isHero
      ? '<div class="bar xp" data-bar="xp"><i></i><span></span></div>' +
        '<div class="fighterGold"><span class="coin"></span><b data-f="gold"></b></div>'
      : '<div class="fighterReward" data-f="reward"></div>');
  panel.dataset.built = '1';
}
