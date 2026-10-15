// Подсказка хода (макет «Агитпроп»): под двумя клетками хода — общая кремовая рамка с золотой кромкой и свечением,
// между ними — маленькая стрелка «↔» (или «↕»). pair — [[r, c], [r, c]]. Убирает clearHint.
function drawHintFrame(pair) {
  const [a, b] = pair;
  const r0 = Math.min(a[0], b[0]), c0 = Math.min(a[1], b[1]);
  const r1 = Math.max(a[0], b[0]), c1 = Math.max(a[1], b[1]);
  const cell = match3.layout.cell, pad = 3;
  const frame = document.createElement('div');
  frame.className = 'hintFrame';
  frame.style.left = (cellOffset(c0) - pad) + 'px';
  frame.style.top = (cellOffset(r0) - pad) + 'px';
  frame.style.width = (cellOffset(c1) - cellOffset(c0) + cell + pad * 2) + 'px';
  frame.style.height = (cellOffset(r1) - cellOffset(r0) + cell + pad * 2) + 'px';
  document.getElementById('boardCells').appendChild(frame);
  const arrow = document.createElement('div');
  const vertical = a[1] === b[1];
  arrow.className = 'hintArrow' + (vertical ? ' vertical' : '');
  arrow.style.left = ((cellOffset(c0) + cellOffset(c1) + cell) / 2) + 'px';
  arrow.style.top = ((cellOffset(r0) + cellOffset(r1) + cell) / 2) + 'px';
  arrow.innerHTML = '<svg viewBox="0 0 32 20" aria-hidden="true"><path d="M2 10 L10 3 V7 H22 V3 L30 10 L22 17 V13 H10 V17 Z" fill="#efe1bc" stroke="#6c3806" stroke-width="2" stroke-linejoin="round"/></svg>';
  document.getElementById('board').appendChild(arrow);
}
