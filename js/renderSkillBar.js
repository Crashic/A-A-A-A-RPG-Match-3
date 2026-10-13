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
    b.innerHTML = '<b></b><small></small>';
    b.firstChild.textContent = s.name;
    const wait = (battle.skill.cooldowns || {})[s.id];
    const gems = Object.keys(s.cost || {});
    if (s.classSkill && gems.length === 1) {
      b.lastChild.innerHTML = gemMiniIcon(gems[0]) + '<span></span>';
      b.lastChild.lastChild.textContent = s.cost[gems[0]] + (wait ? ' · ждать ' + wait : ' · пер. ' + s.cooldown);
    } else {
      b.lastChild.textContent = s.once && battle.skill.used[s.id] ? 'использован' : skillCostText(s) + (s.once ? ' · 1 раз' : '');
    }
    b.addEventListener('click', () => useSkill(s.id));
    buttons.appendChild(b);
  }
  if (settings.cheatsOn) { // режим читов: мгновенная победа
    const k = document.createElement('button');
    k.type = 'button';
    k.className = 'btn red skillBtn killAll';
    k.disabled = !isHeroTurn() || !match3 || match3.busy || battle.over; // поле может ещё не появиться
    k.dataset.tipTitle = 'KILL ALL';
    k.dataset.tip = 'Чит: мгновенно убивает текущего врага.';
    k.innerHTML = '<b>KILL ALL</b><small>чит · ход не нужен</small>';
    k.addEventListener('click', () => killAll());
    buttons.appendChild(k);
  }
  row.appendChild(buttons);
  bar.appendChild(row);
}
