// Экран реестра: слева паутинка узлов (линии-связи, узел — номер компенсации и ранг; оформленные — яркие,
// доступные — с золотой каймой, остальные — бледные), справа выбранная компенсация: «Компенсация № N: бонус.
// Причина: …», ранг, «Оформить» и «Аннулировать всё»; сверху — очки (свободно / всего).
function renderParagon() {
  const left = document.getElementById('paragonLeft');
  const right = document.getElementById('paragonRight');
  const ranks = paragonRanks();
  const pts = paragonPoints();
  const W = 7, H = 5;
  const pos = n => [(n.x + 0.5) / W * 100, (n.y + 0.5) / H * 100];
  let lines = '';
  const seen = {};
  for (const n of PARAGON_NODES) for (const id of n.links) {
    const m = findById(PARAGON_NODES, id);
    const key = [n.id, id].sort().join('-');
    if (!m || seen[key]) continue;
    seen[key] = 1;
    const [x1, y1] = pos(n), [x2, y2] = pos(m);
    const on = ranks[n.id] && ranks[id];
    lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${on ? 'on' : ''}"/>`;
  }
  left.innerHTML = '<div class="pgWeb"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + lines + '</svg></div>';
  const web = left.querySelector('.pgWeb');
  for (const n of PARAGON_NODES) {
    const r = ranks[n.id] || 0;
    const can = paragonCanTake(n).ok;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pgNode' + (r ? ' taken' : '') + (r >= n.max ? ' full' : '') + (can ? ' can' : '') + (n.id === paragonSel ? ' selected' : '') + (n.kind === 'active' ? ' active' : '');
    const [x, y] = pos(n);
    b.style.left = x + '%';
    b.style.top = y + '%';
    b.innerHTML = '<small>№' + n.no + '</small><b>' + r + '/' + n.max + '</b>';
    b.dataset.tipTitle = tr("ui.Компенсация № ") + n.no;
    b.dataset.tip = paragonEffectText(n);
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); paragonSel = n.id; renderParagon(); storyEvent('paragonSel', n.id); });
    web.appendChild(b);
  }
  const n = findById(PARAGON_NODES, paragonSel) || PARAGON_NODES[0];
  const r = ranks[n.id] || 0;
  const check = paragonCanTake(n);
  // справа (макет «Реестр»): плашки очков, бумажная «Форма К-7» с компенсацией, «Получить» и «Аннулировать всё»
  right.innerHTML = '<div class="pgPts"><div><small></small><b></b></div><div><small></small><b></b></div></div>' +
    '<div class="pgForm paper"><p class="pgFormNo"></p><p class="pgName"></p><p class="pgBonus"></p><p class="pgReason"></p><p class="pgRank"></p></div>' +
    '<div class="pgBtns"></div><p class="pgWhy"></p>';
  const plates = right.querySelectorAll('.pgPts > div');
  plates[0].querySelector('small').textContent = tr("ui.Свободно очков");
  plates[0].querySelector('b').textContent = pts.free;
  plates[1].querySelector('small').textContent = tr("ui.Всего очков");
  plates[1].querySelector('b').textContent = pts.total;
  right.querySelector('.pgPts').dataset.tipTitle = PARAGON_NAME;
  right.querySelector('.pgPts').dataset.tip = tr("ui.Реестр общий: компенсации получают все ваши персонажи. 1 очко — за каждые ") + PARAGON_LEVEL_STEP +
    tr("ui. уровней любого персонажа. Герой одновременно числится героем и пострадавшим — так выгоднее.");
  right.querySelector('.pgFormNo').textContent = tr("ui.Форма К-7 · компенсация") + (n.kind === 'active' ? tr("ui. · навык") : '');
  right.querySelector('.pgName').textContent = tr("ui.Компенсация № ") + n.no;
  right.querySelector('.pgBonus').innerHTML = '<b></b>';
  right.querySelector('.pgBonus b').textContent = paragonEffectText(n).replace(/\.$/, '');
  right.querySelector('.pgBonus').append(tr("ui. за ранг"));
  right.querySelector('.pgReason').textContent = n.name + '. ' + tr("ui.Причина: ") + n.reason + '.';
  right.querySelector('.pgRank').textContent = tr("ui.Ранг: ") + r + ' / ' + n.max;
  const btns = right.querySelector('.pgBtns');
  const take = document.createElement('button');
  take.type = 'button';
  take.className = 'btn green';
  take.dataset.role = 'take';
  take.textContent = r >= n.max ? tr("ui.Выплачено") : tr("ui.Получить · 1 очко");
  take.disabled = !check.ok;
  take.addEventListener('click', e => { e.stopPropagation(); paragonTake(n.id); });
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'btn red';
  reset.textContent = tr("ui.Аннулировать всё");
  reset.addEventListener('click', e => { e.stopPropagation(); vibrate(); paragonReset(); });
  btns.append(take, reset);
  right.querySelector('.pgWhy').textContent = check.ok ? '' : check.why;
}
