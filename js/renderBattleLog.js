// Чат-лог боя (#battleLog): последние строки battle.log, новые снизу, прокручен к концу.
// Строки героя — светлые, врага — красноватые, системные — золотые.
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
}
