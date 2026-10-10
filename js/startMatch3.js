// Запускает новое поле «3 в ряд» на экране игры.
async function startMatch3() {
  if (match3) clearHint();
  document.getElementById('boardGems').innerHTML = '';
  match3 = { grid: generateGrid(), els: [], busy: true, selected: null, hintTimer: null, layout: null };
  match3.layout = computeBoardLayout();
  renderBoardCells();
  await dropInGrid();
  match3.busy = false;
  scheduleHint();
}
