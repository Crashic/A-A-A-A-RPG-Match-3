// Фишки падают в пустые клетки, сверху появляются новые.
async function collapseAndRefill() {
  const n = BOARD_SIZE;
  const layer = document.getElementById('boardGems');
  const moves = []; // [el, row, col, distance]
  const fresh = []; // новые фишки: [row, col, сколько клеток падать]
  for (let c = 0; c < n; c++) {
    let write = n - 1;
    for (let r = n - 1; r >= 0; r--) {
      if (match3.grid[r][c] === null) continue;
      if (r !== write) {
        match3.grid[write][c] = match3.grid[r][c];
        match3.els[write][c] = match3.els[r][c];
        match3.grid[r][c] = null;
        match3.els[r][c] = null;
        moves.push([match3.els[write][c], write, c, write - r]);
      }
      write--;
    }
    // новые фишки над полем: столько, сколько пустых клеток сверху
    const empty = write + 1;
    for (let r = write; r >= 0; r--) {
      match3.grid[r][c] = randomGemType();
      fresh.push([r, c, empty]);
    }
  }
  // учебный бой: новые фишки не должны сами сложиться в ряд — иначе собьётся сценарий
  if (tutorialActive()) {
    const isFresh = new Set(fresh.map(([r, c]) => r * n + c));
    for (let k = 0; k < 200; k++) {
      const bad = findMatches(match3.grid).filter(([r, c]) => isFresh.has(r * n + c));
      if (!bad.length) break;
      const [r, c] = bad[Math.floor(Math.random() * bad.length)];
      match3.grid[r][c] = Math.floor(Math.random() * GEM_TYPES.length);
    }
  }
  for (const [r, c, empty] of fresh) {
    const el = createGemElement(match3.grid[r][c]);
    layer.appendChild(el);
    placeGem(el, r - empty, c);
    match3.els[r][c] = el;
    moves.push([el, r, c, empty]);
  }
  layer.getBoundingClientRect();
  let longest = 0;
  for (const [el, r, c, dist] of moves) {
    const d = Math.max(ANIM_FALL_MIN, dist * ANIM_FALL_ROW);
    placeGem(el, r, c, d);
    longest = Math.max(longest, d);
  }
  await sleep(longest);
}
