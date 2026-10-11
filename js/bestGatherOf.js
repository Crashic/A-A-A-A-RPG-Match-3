// Сколько фишек из списка gems игрок может собрать одним лучшим ходом на поле grid (без каскадов).
function bestGatherOf(grid, gems) {
  if (!gems.length) return 0;
  const types = new Set(gems.map(id => GEM_TYPES.findIndex(g => g.id === id)));
  let best = 0;
  for (const m of listMoves(grid)) {
    swapInGrid(grid, m.a, m.b);
    const n = findMatches(grid).filter(([r, c]) => types.has(grid[r][c])).length;
    swapInGrid(grid, m.a, m.b);
    if (n > best) best = n;
  }
  return best;
}
