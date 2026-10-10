// Длина самого длинного ряда одинаковых фишек на поле (по горизонтали или вертикали).
function longestRun(grid) {
  const n = grid.length;
  let best = 0;
  for (let i = 0; i < n; i++) {
    let row = 1, col = 1;
    for (let k = 1; k < n; k++) {
      row = grid[i][k] !== null && grid[i][k] === grid[i][k - 1] ? row + 1 : 1;
      col = grid[k][i] !== null && grid[k][i] === grid[k - 1][i] ? col + 1 : 1;
      best = Math.max(best, row, col);
    }
  }
  return best;
}
