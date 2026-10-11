// Самая большая связная группа одинаковых фишек среди собранных клеток cells
// (соседи по горизонтали и вертикали): крест, «Г», «Т» из двух рядов считаются одной группой.
function largestGroup(grid, cells) {
  const n = grid.length;
  const inSet = new Set(cells.map(([r, c]) => r * n + c));
  const seen = new Set();
  let best = 0;
  for (const [r0, c0] of cells) {
    const start = r0 * n + c0;
    if (seen.has(start)) continue;
    const type = grid[r0][c0];
    let size = 0;
    const stack = [[r0, c0]];
    seen.add(start);
    while (stack.length) {
      const [r, c] = stack.pop();
      size++;
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr, nc = c + dc, k = nr * n + nc;
        if (nr < 0 || nc < 0 || nr >= n || nc >= n || seen.has(k) || !inSet.has(k) || grid[nr][nc] !== type) continue;
        seen.add(k);
        stack.push([nr, nc]);
      }
    }
    best = Math.max(best, size);
  }
  return best;
}
