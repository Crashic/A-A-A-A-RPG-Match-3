// Клетка поля под точкой касания экрана (clientX, clientY) или null вне поля.
function cellFromPoint(clientX, clientY) {
  const p = toAppPoint(clientX, clientY);
  const rect = appRect(document.getElementById('board'));
  const step = match3.layout.cell + BOARD_GAP;
  const c = Math.floor((p.x - rect.left - BOARD_FRAME - BOARD_PAD + BOARD_GAP / 2) / step);
  const r = Math.floor((p.y - rect.top - BOARD_FRAME - BOARD_PAD + BOARD_GAP / 2) / step);
  if (r < 0 || c < 0 || r >= BOARD_SIZE || c >= BOARD_SIZE) return null;
  return [r, c];
}
