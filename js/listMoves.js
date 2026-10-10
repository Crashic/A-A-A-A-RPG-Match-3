// Все ходы на поле, после которых появляется ряд: [{ a, b }, …].
function listMoves(grid) {
  const n = grid.length;
  const moves = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const a = [r, c];
        const b = [r + dr, c + dc];
        if (b[0] >= n || b[1] >= n) continue;
        swapInGrid(grid, a, b);
        if (findMatches(grid).length) moves.push({ a, b });
        swapInGrid(grid, a, b);
      }
    }
  }
  return moves;
}
