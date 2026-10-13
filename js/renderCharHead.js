// Шапка экрана «Персонаж»: имя по центру, сервер и режим, под ними уровень и полоса опыта.
function renderCharHead(box, hero) {
  box.innerHTML = '<h3></h3><p class="charServer"></p><div class="charLevel"><span></span><div class="bar xp"><i></i><span></span></div></div>';
  box.querySelector('h3').textContent = hero.name;
  box.querySelector('.charServer').textContent = heroServerText(hero);
  box.querySelector('.charLevel > span').textContent = tr("ui.Уровень ") + hero.level;
  const need = xpToNext(hero.level);
  setBar(box.querySelector('.bar'), hero.xp, need, need ? tr("ui.Опыт ") + hero.xp + ' / ' + need : tr("ui.Макс. уровень"));
}
