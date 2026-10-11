// Шапка экрана «Персонаж»: имя, фракция и класс, уровень и полоса опыта.
function renderCharHead(box, hero) {
  const faction = findById(FACTIONS, hero.factionId);
  const cls = findById(CLASSES, hero.classId);
  box.innerHTML = '<h3></h3><p class="charWho"></p>' +
    '<div class="charLevel"><span></span><div class="bar xp"><i></i><span></span></div></div>';
  box.querySelector('h3').textContent = hero.name;
  box.querySelector('.charWho').textContent = (faction ? faction.name : '') + (cls ? ' · ' + cls.name : '');
  box.querySelector('.charLevel > span').textContent = 'Уровень ' + hero.level;
  const need = xpToNext(hero.level);
  setBar(box.querySelector('.bar'), hero.xp, need, need ? 'Опыт ' + hero.xp + ' / ' + need : 'Макс. уровень');
}
