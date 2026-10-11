// Навыки под панелью игрока: кнопки активных (название и цена; у боевого навыка класса — значок маны
// и перезарядка; недоступные — серые)
// и иконки пассивных с подсказкой.
function renderSkillBar() {
  const bar = document.getElementById('skillBar');
  if (!battle) { bar.innerHTML = ''; return; }
  const skills = heroSkills(battle.save);
  bar.innerHTML = '';
  for (const s of skills.filter(s => s.type === 'active')) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn purple skillBtn';
    b.disabled = !canUseSkill(s);
    b.title = s.text;
    b.innerHTML = '<b></b><small></small>';
    b.firstChild.textContent = s.name;
    const wait = (battle.skill.cooldowns || {})[s.id];
    const gems = Object.keys(s.cost || {});
    if (s.classSkill && gems.length === 1) {
      // боевой навык класса: значок маны, цена и перезарядка
      b.lastChild.innerHTML = gemMiniIcon(gems[0]) + '<span></span>';
      b.lastChild.lastChild.textContent = s.cost[gems[0]] + (wait ? ' · ждать ' + wait : ' · перезарядка ' + s.cooldown);
    } else {
      b.lastChild.textContent = s.once && battle.skill.used[s.id] ? 'использован' : skillCostText(s) + (s.once ? ' · раз за бой' : '');
    }
    b.addEventListener('click', () => useSkill(s.id));
    bar.appendChild(b);
  }
  // пассивные — только иконки; название и описание — в подсказке (attachTip)
  const passive = skills.filter(s => s.type === 'passive');
  if (passive.length) {
    const row = document.createElement('div');
    row.className = 'skillPassive';
    const cls = findById(CLASSES, battle.save.classId);
    for (const s of passive) {
      const icon = document.createElement('span');
      icon.className = 'passiveIcon';
      icon.innerHTML = iconTile(cls ? cls.icon : 'stamp', cls ? cls.color : 'var(--gem-amethyst)');
      icon.setAttribute('aria-label', s.name);
      attachTip(icon, s.name + ' · пассивный', s.text);
      row.appendChild(icon);
    }
    bar.appendChild(row);
  }
}
