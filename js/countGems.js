// Сколько фишек каждого вида в списке клеток: { ruby: 3, pearl: 4, … }.
function countGems(grid, cells) {
  const count = {};
  for (const [r, c] of cells) {
    const t = grid[r][c];
    if (t === null) continue;
    const id = GEM_TYPES[t].id;
    count[id] = (count[id] || 0) + 1;
  }
  return count;
}
