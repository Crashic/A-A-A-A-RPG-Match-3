// Меняет местами две клетки в массиве поля (без анимации).
function swapInGrid(grid, a, b) {
  const t = grid[a[0]][a[1]];
  grid[a[0]][a[1]] = grid[b[0]][b[1]];
  grid[b[0]][b[1]] = t;
}
