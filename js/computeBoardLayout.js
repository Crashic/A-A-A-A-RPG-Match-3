// Размер клетки под ширину экрана: по макету 46 px, на узком телефоне меньше.
function computeBoardLayout() {
  const board = document.getElementById('board');
  const wrap = board.parentElement.clientWidth;
  const maxBoard = BOARD_SIZE * BOARD_MAX_CELL + (BOARD_SIZE - 1) * BOARD_GAP + BOARD_PAD * 2;
  const size = Math.min(wrap, maxBoard);
  const cell = (size - BOARD_PAD * 2 - (BOARD_SIZE - 1) * BOARD_GAP) / BOARD_SIZE;
  board.style.width = size + 'px';
  board.style.height = size + 'px';
  board.style.setProperty('--cell', cell + 'px');
  return { cell, size };
}
