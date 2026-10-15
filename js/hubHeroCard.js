// Мини-карточка героя в игровом меню: плитка расы, имя, «Ур. N · класс», изолента мотками.
function hubHeroCard(hero) {
  const race = findById(RACES, hero.raceId);
  const cls = findById(CLASSES, hero.classId);
  const el = document.createElement('div');
  el.className = 'panel hubHero';
  el.innerHTML = '<span class="hubAvatar">' + (race ? iconTile(race.icon, race.color) : '') + '</span>' +
    '<span class="hubHeroInfo"><b></b><small></small><span class="hubTape">' + formatTape(hero.tape) + '</span></span>';
  el.querySelector('b').textContent = hero.name;
  el.querySelector('small').textContent = tr('ui.Ур.') + ' ' + hero.level + (cls ? ' · ' + cls.name : '');
  return el;
}
