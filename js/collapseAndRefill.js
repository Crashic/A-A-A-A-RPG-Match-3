// Фишки падают в пустые клетки, сверху появляются новые.
async function collapseAndRefill() {
  const n = BOARD_SIZE;
  const layer = document.getElementById('boardGems');
  const moves = []; // [el, row, col, distance]
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
      const type = randomGemType();
      const el = createGemElement(type);
      layer.appendChild(el);
      placeGem(el, r - empty, c);
      match3.grid[r][c] = type;
      match3.els[r][c] = el;
      moves.push([el, r, c, empty]);
    }
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
