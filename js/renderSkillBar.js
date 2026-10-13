// Навыки под панелью игрока: кнопки активных навыков (иконки бонусов убраны по просьбе автора;
// на телефоне — в одну колонку, CSS) (название и цена; у боевого навыка класса — значок маны
// и перезарядка; недоступные — серые). Как у врага: иконки рядом с навыком.
function renderSkillBar() {
  const bar = document.getElementById('skillBar');
  if (!battle) { bar.innerHTML = ''; return; }
  const skills = heroSkills(battle.save);
  bar.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'heroSkillRow';
  const buttons = document.createElement('div');
  buttons.className = 'heroSkillBtns';
  for (const s of skills.filter(s => s.type === 'active')) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn purple skillBtn';
    b.disabled = !canUseSkill(s);
    b.dataset.tipTitle = s.name;
    b.dataset.tip = s.text;
    // слева — мана: значок и сколько нужно; справа в две строки — название и описание
    b.classList.add('skillBtn2');
    b.innerHTML = '<span class="skCost"></span><span class="skText"><b></b><small></small></span>';
    const cost = b.querySelector('.skCost');
    for (const g of Object.keys(s.cost || {})) cost.insertAdjacentHTML('beforeend', gemMiniIcon(g) + '<i>' + s.cost[g] + '</i>');
    if (!cost.children.length) cost.remove();
    b.querySelector('b').textContent = s.name;
    const wait = (battle.skill.cooldowns || {})[s.id];
    b.querySelector('small').textContent = s.once && battle.skill.used[s.id] ? tr("ui.Уже использован в этом бою")
      : wait ? tr("ui.Перезарядка: ещё ") + wait + ' ' + plural(wait, tr("ui.ход"), tr("ui.хода"), tr("ui.ходов")) : s.text;
    b.addEventListener('click', () => useSkill(s.id));
    buttons.appendChild(b);
  }
  if (settings.cheatsOn) { // режим читов: мгновенная победа
    const k = document.createElement('button');
    k.type = 'button';
    k.className = 'btn red skillBtn killAll';
    k.disabled = !isHeroTurn() || !match3 || match3.busy || battle.over; // поле может ещё не появиться
    k.dataset.tipTitle = 'KILL ALL';
    k.dataset.tip = tr("ui.Чит: мгновенно убивает текущего врага.");
    k.innerHTML = tr("ui.<b>KILL ALL</b><small>чит · ход не нужен</small>");
    k.addEventListener('click', () => killAll());
    buttons.appendChild(k);
  }
  row.appendChild(buttons);
  bar.appendChild(row);
}
