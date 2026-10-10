// Лучший ход на поле: собирает больше всего фишек gemId (если задан), иначе — самый длинный ряд
// и больше фишек. Возвращает { a, b } или null.
function bestMoveFor(grid, gemId) {
  const type = gemId ? GEM_TYPES.findIndex(g => g.id === gemId) : -1;
  let best = null, bestScore = -1;
  for (const m of listMoves(grid)) {
    swapInGrid(grid, m.a, m.b);
    const cells = findMatches(grid);
    const own = type < 0 ? 0 : cells.filter(([r, c]) => grid[r][c] === type).length;
    const score = own * 100 + longestRun(grid) * 10 + cells.length + Math.random();
    swapInGrid(grid, m.a, m.b);
    if (score > bestScore) { best = m; bestScore = score; }
  }
  return best;
}
