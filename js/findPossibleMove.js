// Ищет ход, после которого появится ряд из 3+. Возвращает { a: [r, c], b: [r, c] } или null.
// Порядок перебора случайный, чтобы подсказка не всегда была в одном углу.
function findPossibleMove(grid) {
  const n = grid.length;
  const cells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) cells.push([r, c]);
  cells.sort(() => Math.random() - 0.5);
  for (const a of cells) {
    for (const [dr, dc] of [[0, 1], [1, 0]]) {
      const b = [a[0] + dr, a[1] + dc];
      if (b[0] >= n || b[1] >= n) continue;
      swapInGrid(grid, a, b);
      const ok = findMatches(grid).length > 0;
      swapInGrid(grid, a, b);
      if (ok) return { a, b };
    }
  }
  return null;
}
