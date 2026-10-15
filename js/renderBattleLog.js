// Чат-лог боя (#battleLog): последние строки battle.log, новые снизу, прокручен к концу.
// Строки героя, врага и системные — разным цветом. Над логом — табличка локации, сбоку — стрелка «свернуть».
function renderBattleLog() {
  const box = document.getElementById('battleLog');
  if (!box) return;
  const list = (battle && battle.log) || [];
  box.innerHTML = '';
  for (const l of list.slice(-BATTLE_LOG_MAX)) {
    const p = document.createElement('p');
    p.className = 'log-' + l.s;
    p.textContent = l.t;
    box.appendChild(p);
  }
  box.scrollTop = box.scrollHeight;
  // табличка с названием локации на логе и сворачивание лога (settings.logClosed)
  const found = battle && findEnemy(battle.enemyId);
  const plate = document.getElementById('battleZone');
  if (plate) plate.textContent = found ? found.zone.name : '';
  const corner = box.closest('.battleCorner');
  if (corner) corner.classList.toggle('logClosed', !!settings.logClosed);
  const toggle = document.getElementById('logToggle');
  if (toggle) toggle.onclick = e => { e.stopPropagation(); vibrate(); settings.logClosed = !settings.logClosed; saveSettings(); renderBattleLog(); };
}
