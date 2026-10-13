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
  p(tr("ui.Ур. ") + e.level + (e.elite ? tr("ui. · Элита") : '') + ' · ' + zone.name, 'eiSub');
  const hp = document.createElement('div');
  hp.className = 'statRow';
  hp.innerHTML = heartIcon() + '<div class="bar hp"><i></i><span></span></div>';
  setBar(hp.querySelector('.bar'), f.hp, f.maxHp);
  body.appendChild(hp);
  p(e.description, 'eiLore');
  if (f.stats) {
    const head = p(tr("ui.Характеристики"), 'eiHead');
    head.dataset.x = '';
    const grid = document.createElement('div');
    grid.className = 'eiStats';
    for (const s of STATS) grid.appendChild(statChip(null, s.id, f.stats[s.id]));
    body.appendChild(grid);
    p(tr("ui.Атака ") + f.attack + tr("ui. · Крит ") + (f.critPct || 0).toFixed(1).replace('.', ',') + tr("ui. % · Щит до ") + f.maxShield + tr("ui. · Мана до ") + (f.manaMax || MANA_MAX) + tr("ui. · Наглость ") + (f.ini || 0), 'eiDerived');
  }
  p(tr("ui.Навыки"), 'eiHead');
  const skill = ENEMY_SKILLS[e.id];
  if (skill) p('«' + skill.name + tr("ui.» — активный, ") + skillCostText(skill) + ': ' + skill.text + ' ' + skill.lore, 'eiSkill');
  if (e.skill) p('«' + e.skill + tr("ui.» — пассивный: ") + e.short + tr("ui. (в бою пока не работает)"), 'eiSkill');
  document.getElementById('enemyInfo').classList.add('open');
}
