// Размер поля: квадрат по меньшей стороне свободного места (в горизонтали — по высоте экрана),
// клетка не больше BOARD_MAX_CELL (46 px по макету).
function computeBoardLayout() {
  const board = document.getElementById('board');
  const wrap = board.parentElement;
  const maxBoard = BOARD_SIZE * BOARD_MAX_CELL + (BOARD_SIZE - 1) * BOARD_GAP + BOARD_PAD * 2;
  const size = Math.floor(Math.min(wrap.clientWidth - BOARD_FRAME * 2, wrap.clientHeight - BOARD_FRAME * 2, maxBoard)); // вокруг — рамка цвета хода
  const cell = (size - BOARD_PAD * 2 - (BOARD_SIZE - 1) * BOARD_GAP) / BOARD_SIZE;
  board.style.width = size + 'px';
  board.style.height = size + 'px';
  board.style.setProperty('--cell', cell + 'px');
  return { cell, size };
}
