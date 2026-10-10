// Все клетки, входящие в ряды из 3+ одинаковых фишек по горизонтали или вертикали.
// Возвращает массив [r, c] без повторов.
function findMatches(grid) {
  const n = grid.length;
  const hit = new Set();
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; ) {
      const t = grid[r][c];
      let e = c + 1;
      while (e < n && t !== null && grid[r][e] === t) e++;
      if (t !== null && e - c >= 3) for (let k = c; k < e; k++) hit.add(r * n + k);
      c = e;
    }
  }
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < n; ) {
      const t = grid[r][c];
      let e = r + 1;
      while (e < n && t !== null && grid[e][c] === t) e++;
      if (t !== null && e - r >= 3) for (let k = r; k < e; k++) hit.add(k * n + c);
      r = e;
    }
  }
  return [...hit].map(i => [Math.floor(i / n), i % n]);
}
