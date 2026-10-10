// Клетка поля под точкой касания (clientX, clientY) или null вне поля.
function cellFromPoint(x, y) {
  const rect = document.getElementById('board').getBoundingClientRect();
  const step = match3.layout.cell + BOARD_GAP;
  const c = Math.floor((x - rect.left - BOARD_PAD + BOARD_GAP / 2) / step);
  const r = Math.floor((y - rect.top - BOARD_PAD + BOARD_GAP / 2) / step);
  if (r < 0 || c < 0 || r >= BOARD_SIZE || c >= BOARD_SIZE) return null;
  return [r, c];
}
