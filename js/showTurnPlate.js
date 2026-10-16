// Табличка «чей ход» на верхней рамке поля (макет «Подсказка: чей ход», вариант A): при смене хода появляется на 1 с
// и исчезает; пропадает сразу, если игрок коснулся экрана или пошевелил мышью. «◀ ВАШ ХОД» золотом — стрелка к герою,
// «ХОД ВРАГА ▶» фиолетом, «◀ ЕЩЁ ХОД!» — повторный ход героя; справа номер хода. shake — тряска (касание поля в ход врага).
function showTurnPlate(extra, shake) {
  if (!battle) return;
  let el = document.getElementById('turnPlate');
  if (!el) {
    el = document.createElement('div');
    el.id = 'turnPlate';
    el.setAttribute('aria-live', 'polite');
    document.querySelector('#game .boardWrap').appendChild(el);
    const hide = () => { if (Date.now() - (showTurnPlate.at || 0) > 120) el.classList.remove('show'); };
    ['pointerdown', 'pointermove', 'touchstart', 'keydown'].forEach(ev => document.addEventListener(ev, hide, { passive: true }));
  }
  const hero = battle.turn === 'hero';
  el.className = hero ? 'hero' : 'enemy';
  el.innerHTML = '<b></b><small></small>';
  el.querySelector('b').textContent = hero ? (extra ? tr("ui.◀ Ещё ход!") : tr("ui.◀ Ваш ход")) : tr("ui.Ход врага ▶");
  el.querySelector('small').textContent = '№ ' + (battle.turnNo || 1);
  void el.offsetWidth;
  showTurnPlate.at = Date.now();
  el.classList.add('show');
  if (shake) el.classList.add('shake');
  clearTimeout(showTurnPlate.timer);
  showTurnPlate.timer = setTimeout(() => el.classList.remove('show'), 1000);
}
