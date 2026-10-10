// Управление: перетаскивание фишки к соседней клетке или касание двух соседних фишек по очереди.
function setupBoardInput() {
  const board = document.getElementById('board');
  let drag = null; // { cell, x, y, moved }

  board.addEventListener('pointerdown', e => {
    if (!match3 || match3.busy) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    clearHint();
    const start = toAppPoint(e.clientX, e.clientY);
    drag = { cell, x: start.x, y: start.y, moved: false };
    board.setPointerCapture(e.pointerId);
  });

  board.addEventListener('pointermove', e => {
    if (!drag || drag.moved || !match3 || match3.busy) return;
    const now = toAppPoint(e.clientX, e.clientY);
    const dx = now.x - drag.x;
    const dy = now.y - drag.y;
    const limit = match3.layout.cell * 0.35;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < limit) return;
    drag.moved = true;
    const [r, c] = drag.cell;
    const to = Math.abs(dx) > Math.abs(dy) ? [r, c + Math.sign(dx)] : [r + Math.sign(dy), c];
    if (to[0] >= 0 && to[1] >= 0 && to[0] < BOARD_SIZE && to[1] < BOARD_SIZE) attemptSwap(drag.cell, to);
  });

  board.addEventListener('pointerup', e => {
    if (!drag) return;
    const { cell, moved } = drag;
    drag = null;
    if (moved || !match3 || match3.busy) return;
    const sel = match3.selected;
    if (sel && sel[0] === cell[0] && sel[1] === cell[1]) selectGem(null);
    else if (sel && isAdjacent(sel, cell)) attemptSwap(sel, cell);
    else { vibrate(); selectGem(cell); }
    if (!match3.busy) scheduleHint();
  });

  board.addEventListener('pointercancel', () => { drag = null; });

  // при повороте экрана или изменении окна — пересчитать размеры
  window.addEventListener('resize', () => {
    if (!match3) return;
    match3.layout = computeBoardLayout();
    renderBoardCells();
    for (let r = 0; r < BOARD_SIZE; r++)
      for (let c = 0; c < BOARD_SIZE; c++)
        if (match3.els[r][c]) placeGem(match3.els[r][c], r, c);
  });
}
