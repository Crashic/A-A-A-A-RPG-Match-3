// Под панелью врага: активный навык за ману (значок маны, цена, перезарядка; подсказка — что делает),
// (иконки бонусов убраны по просьбе автора). Характеристики и подробности — по касанию
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
  const skill = ENEMY_SKILLS[e.id];
  if (skill) {
    const gem = Object.keys(skill.cost)[0];
    const wait = battle.skill.enemyCd || 0;
    const ready = !wait && (f.mana[gem] || 0) >= skill.cost[gem];
    const card = document.createElement('div');
    // та же схема, что у кнопки навыка героя: слева мана (значок и цена), справа название и описание
    card.className = 'enemyActive skillBtn2' + (ready ? ' ready' : '');
    card.innerHTML = '<span class="skCost">' + gemMiniIcon(gem) + '<i>' + skill.cost[gem] + '</i></span><span class="skText"><b></b><small></small></span>';
    card.querySelector('b').textContent = skill.name;
    card.querySelector('small').textContent = wait ? 'Перезарядка: ещё ' + wait + ' ' + plural(wait, 'ход', 'хода', 'ходов') : skill.text;
    attachTip(card, skill.name + ' · активный', skill.text + ' ' + skill.lore);
    row.appendChild(card);
  }
  box.appendChild(row);
}
