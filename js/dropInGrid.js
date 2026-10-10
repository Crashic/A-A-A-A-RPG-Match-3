// Ставит фишки нового поля над ним и роняет их на места.
async function dropInGrid() {
  const layer = document.getElementById('boardGems');
  const n = BOARD_SIZE;
  match3.els = [];
  for (let r = 0; r < n; r++) {
    match3.els.push([]);
    for (let c = 0; c < n; c++) {
      const el = createGemElement(match3.grid[r][c]);
      layer.appendChild(el);
      placeGem(el, r - n, c);
      match3.els[r].push(el);
    }
  }
  layer.getBoundingClientRect(); // применить стартовые позиции до анимации
  let longest = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const d = ANIM_FALL_MIN + n * ANIM_FALL_ROW * 0.6 + (n - r) * 18 + c * 6;
      placeGem(match3.els[r][c], r, c, d);
      longest = Math.max(longest, d);
    }
  }
  await sleep(longest);
}
