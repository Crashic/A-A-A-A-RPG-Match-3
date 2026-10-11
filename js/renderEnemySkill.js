// Под панелью врага: активный навык за ману (значок маны, цена, перезарядка; подсказка — что делает)
// и навык из списка автора — иконкой с подсказкой. Характеристики и подробности — по касанию
// на панель врага (openEnemyInfo).
function renderEnemySkill() {
  const box = document.getElementById('enemySkill');
  const found = battle && findEnemy(battle.enemyId);
  box.innerHTML = '';
  if (!found) return;
  const e = found.enemy;
  const f = battle.enemy;
  const row = document.createElement('div');
  row.className = 'enemySkillRow';
  if (e.skill) {
    const icon = document.createElement('span');
    icon.className = 'passiveIcon';
    icon.innerHTML = iconTile('eye', 'var(--gem-ruby)');
    icon.setAttribute('aria-label', e.skill);
    attachTip(icon, e.skill + ' · пассивный', e.short + ' ' + e.description + ' (в бою пока не работает)');
    row.appendChild(icon);
  }
  const skill = ENEMY_SKILLS[e.id];
  if (skill) {
    const gem = Object.keys(skill.cost)[0];
    const wait = battle.skill.enemyCd || 0;
    const ready = !wait && (f.mana[gem] || 0) >= skill.cost[gem];
    const card = document.createElement('div');
    card.className = 'enemyActive' + (ready ? ' ready' : '');
    card.innerHTML = '<b></b><small>' + gemMiniIcon(gem) + '<span></span></small>';
    card.querySelector('b').textContent = skill.name;
    card.querySelector('small span').textContent = skill.cost[gem] + (wait ? ' · ждать ' + wait : ' · перезарядка ' + skill.cooldown);
    attachTip(card, skill.name + ' · активный', skill.text + ' ' + skill.lore);
    row.appendChild(card);
  }
  box.appendChild(row);
}
