// Шапка экрана «Персонаж»: имя по центру, под ним уровень и полоса опыта.
function renderCharHead(box, hero) {
  box.innerHTML = '<h3></h3><div class="charLevel"><span></span><div class="bar xp"><i></i><span></span></div></div>';
  box.querySelector('h3').textContent = hero.name;
  box.querySelector('.charLevel > span').textContent = 'Уровень ' + hero.level;
  const need = xpToNext(hero.level);
  setBar(box.querySelector('.bar'), hero.xp, need, need ? 'Опыт ' + hero.xp + ' / ' + need : 'Макс. уровень');
}
