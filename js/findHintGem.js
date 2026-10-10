// Для подсказки: выбирает ход с самым длинным рядом (4+ в приоритете — они дают ещё ход)
// и из его пары — ту фишку, которая сама встанет в ряд. Возвращает [r, c] или null, если ходов нет.
function findHintGem(grid) {
  const moves = listMoves(grid).sort(() => Math.random() - 0.5);
  if (!moves.length) return null;
  let best = null, bestRun = 0;
  for (const m of moves) {
    swapInGrid(grid, m.a, m.b);
    const run = longestRun(grid);
    swapInGrid(grid, m.a, m.b);
    if (run > bestRun) { best = m; bestRun = run; }
  }
  const { a, b } = best;
  swapInGrid(grid, a, b);
  const matched = findMatches(grid);
  swapInGrid(grid, a, b);
  const inMatch = cell => matched.some(m => m[0] === cell[0] && m[1] === cell[1]);
  // фишка из a после хода стоит в b: если b в ряду — собирает ряд она, иначе — фишка из b
  return inMatch(b) ? a : b;
}
