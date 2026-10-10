// Выделяет фишку (рамка выбора) или снимает выделение, если cell = null.
function selectGem(cell) {
  if (match3.selected) {
    const old = match3.els[match3.selected[0]][match3.selected[1]];
    if (old) old.classList.remove('selected');
  }
  match3.selected = cell;
  if (cell) {
    const el = match3.els[cell[0]][cell[1]];
    if (el) el.classList.add('selected');
  }
}
