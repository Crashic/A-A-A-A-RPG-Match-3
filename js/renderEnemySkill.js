// Навык врага под его панелью: название и что он делает (js/zones.js).
// Пока только описание — в бою навыки врагов появятся позже.
function renderEnemySkill() {
  const box = document.getElementById('enemySkill');
  const found = battle && findEnemy(battle.enemyId);
  if (!found || !found.enemy.skill) { box.innerHTML = ''; return; }
  const e = found.enemy;
  box.innerHTML = '<b></b><span></span><em></em>';
  box.children[0].textContent = '«' + e.skill + '»';
  box.children[1].textContent = e.short;
  box.children[2].textContent = e.description;
}
