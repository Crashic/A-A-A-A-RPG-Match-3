// Ходов не осталось: все фишки падают вниз за поле, на их место падает новое поле.
// Мана у бойцов сохраняется (решение автора 16.10.2026; раньше, как в Puzzle Quest, сгорала).
async function rebuildBoard() {
  const n = BOARD_SIZE;
  showToast(tr("ui.Ходов нет — новое поле"));
  let longest = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const el = match3.els[r][c];
      if (!el) continue;
      const d = ANIM_FALL_MIN + n * ANIM_FALL_ROW * 0.6 + r * 18 + c * 6;
      el.classList.add('falling');
      placeGem(el, r + n + 1, c, d);
      longest = Math.max(longest, d);
    }
  }
  await sleep(longest);
  document.getElementById('boardGems').innerHTML = '';
  match3.grid = generateGrid();
  await dropInGrid();
}
