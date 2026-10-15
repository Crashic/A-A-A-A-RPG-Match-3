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
    const stub = skillGauge(skill.cost, f.mana); // корешок талона: мана наливается снизу
    card.innerHTML = stub.html + '<span class="skText"><b></b><small></small></span>';
    card.style.setProperty('--stub', stub.width + 'px');
    card.querySelector('.skText b').textContent = skill.name;
    card.querySelector('.skText small').textContent = wait ? tr("ui.Перезарядка: ещё ") + wait + ' ' + plural(wait, tr("ui.ход"), tr("ui.хода"), tr("ui.ходов")) : skill.text;
    attachTip(card, skill.name + tr("ui. · активный"), skill.text + ' ' + skill.lore);
    row.appendChild(card);
  }
  box.appendChild(row);
}
