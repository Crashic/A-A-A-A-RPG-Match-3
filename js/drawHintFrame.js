// Подсказка хода (макет «Агитпроп»): под двумя клетками хода — общая кремовая рамка с золотой кромкой и свечением,
// между ними — маленькая стрелка «↔» (или «↕»). pair — [[r, c], [r, c]]. Убирает clearHint.
function drawHintFrame(pair) {
  const [a, b] = pair;
  const r0 = Math.min(a[0], b[0]), c0 = Math.min(a[1], b[1]);
  const r1 = Math.max(a[0], b[0]), c1 = Math.max(a[1], b[1]);
  const cell = match3.layout.cell, pad = 2;
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
  arrow.innerHTML = '<svg viewBox="0 0 32 20" aria-hidden="true"><path d="M8 4 3 10l5 6M24 4l5 6-5 6M3 10h26" fill="none" stroke="#e0a840" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M8 4 3 10l5 6M24 4l5 6-5 6M3 10h26" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.getElementById('board').appendChild(arrow);
}
