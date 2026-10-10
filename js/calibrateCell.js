// «Полевая калибровка»: какую 1 фишку и в какой тип поменять, чтобы сложилась лучшая серия
// (больше фишек, урон — в приоритете). Возвращает { r, c, type } или null.
function calibrateCell(grid) {
  const n = grid.length;
  let best = null, bestScore = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const was = grid[r][c];
      for (let t = 0; t < GEM_TYPES.length; t++) {
        if (t === was) continue;
        grid[r][c] = t;
        const cells = findMatches(grid);
        if (cells.length) {
          const score = cells.length * 10 + (GEM_EFFECTS[GEM_TYPES[t].id].kind === 'damage' ? 5 : 0) + Math.random();
          if (score > bestScore) { best = { r, c, type: t }; bestScore = score; }
        }
      }
      grid[r][c] = was;
    }
  }
  return best;
}
