// Рисует клетки поля (фон под фишками).
function renderBoardCells() {
  const layer = document.getElementById('boardCells');
  layer.innerHTML = '';
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.transform = 'translate(' + cellOffset(c) + 'px,' + cellOffset(r) + 'px)';
      layer.appendChild(cell);
    }
  }
}
