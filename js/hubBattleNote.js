// Записка на кремовой бумаге в игровом меню: идёт бой — локация, противник, его здоровье и чей ход; боя нет — шутка.
function hubBattleNote(live) {
  const el = document.createElement('div');
  el.className = 'paper hubNote';
  const data = live ? (battle && !battle.over ? battle : loadBattle(getActiveSlot())) : null;
  const found = data && findEnemy(data.enemyId);
  if (!found || !data.enemy) {
    el.innerHTML = '<b></b><p></p>';
    el.querySelector('b').textContent = tr('ui.Боевых действий нет');
    el.querySelector('p').textContent = tr('ui.Враги ждут. Обед у них до 14:00.');
    return el;
  }
  el.innerHTML = '<b></b><p class="hubNoteFoe"></p><p class="hubNoteTurn"></p>';
  el.querySelector('b').textContent = tr('ui.Текущий бой') + ' · ' + found.zone.name;
  el.querySelector('.hubNoteFoe').textContent = tr('ui.Противник') + ': ' + data.enemy.name + ' · ' + tr('ui.ОЗ') + ' ' +
    Math.max(0, Math.round(data.enemy.hp)) + ' / ' + data.enemy.maxHp;
  el.querySelector('.hubNoteTurn').textContent = data.turn === 'hero' ? tr('ui.Ход: ваш. Противник нервничает.') : tr('ui.Ход: противника. Держитесь.');
  return el;
}
