// Выделяет фишку (рамка выбора) и клетку под ней (золотая обводка, как у того, кто ходит)
// или снимает выделение, если cell = null.
function selectGem(cell) {
  const cells = document.getElementById('boardCells').children;
  if (match3.selected) {
    const [r, c] = match3.selected;
    const old = match3.els[r][c];
    if (old) old.classList.remove('selected');
    if (cells[r * BOARD_SIZE + c]) cells[r * BOARD_SIZE + c].classList.remove('picked');
  }
  match3.selected = cell;
  if (cell) {
    const [r, c] = cell;
    const el = match3.els[r][c];
    if (el) el.classList.add('selected');
    if (cells[r * BOARD_SIZE + c]) cells[r * BOARD_SIZE + c].classList.add('picked');
  }
}
