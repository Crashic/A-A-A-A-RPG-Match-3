// Окно «Враг» по касанию на его панель: здоровье, уровень, локация, мини-история (лор автора),
// характеристики с бонусами в бою и навыки (активный за ману и навык из списка автора).
function openEnemyInfo() {
  if (!battle) return;
  const found = findEnemy(battle.enemyId);
  if (!found) return;
  const { zone, enemy: e } = found;
  const f = battle.enemy;
  document.getElementById('enemyInfoTitle').textContent = e.name;
  const body = document.getElementById('enemyInfoBody');
  body.innerHTML = '';
  const p = (text, cls) => { const el = document.createElement('p'); if (cls) el.className = cls; el.textContent = text; body.appendChild(el); return el; };
  p('Ур. ' + e.level + (e.elite ? ' · Элита' : '') + ' · ' + zone.name, 'eiSub');
  const hp = document.createElement('div');
  hp.className = 'statRow';
  hp.innerHTML = heartIcon() + '<div class="bar hp"><i></i><span></span></div>';
  setBar(hp.querySelector('.bar'), f.hp, f.maxHp);
  body.appendChild(hp);
  p(e.description, 'eiLore');
  if (f.stats) {
    const head = p('Характеристики', 'eiHead');
    head.dataset.x = '';
    const grid = document.createElement('div');
    grid.className = 'eiStats';
    for (const s of STATS) grid.appendChild(statChip(null, s.id, f.stats[s.id]));
    body.appendChild(grid);
    p('Атака ' + f.attack + ' · Крит ' + (f.critPct || 0).toFixed(1).replace('.', ',') + ' % · Щит до ' + f.maxShield + ' · Мана до ' + (f.manaMax || MANA_MAX) + ' · Наглость ' + (f.ini || 0), 'eiDerived');
  }
  p('Навыки', 'eiHead');
  const skill = ENEMY_SKILLS[e.id];
  if (skill) p('«' + skill.name + '» — активный, ' + skillCostText(skill) + ': ' + skill.text + ' ' + skill.lore, 'eiSkill');
  if (e.skill) p('«' + e.skill + '» — пассивный: ' + e.short + ' (в бою пока не работает)', 'eiSkill');
  document.getElementById('enemyInfo').classList.add('open');
}
