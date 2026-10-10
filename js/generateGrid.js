// Новое поле: без готовых рядов и хотя бы с одним возможным ходом.
function generateGrid() {
  for (;;) {
    const grid = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      grid.push([]);
      for (let c = 0; c < BOARD_SIZE; c++) {
        let t;
        do {
          t = randomGemType();
        } while (
          (c >= 2 && grid[r][c - 1] === t && grid[r][c - 2] === t) ||
          (r >= 2 && grid[r - 1][c] === t && grid[r - 2][c] === t)
        );
        grid[r].push(t);
      }
    }
    if (findPossibleMove(grid)) return grid;
  }
}
