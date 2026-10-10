// Ходов не осталось: все фишки падают вниз за поле, на их место падает новое поле.
// Как в Puzzle Quest, при этом сгорает вся мана у обоих бойцов.
async function rebuildBoard() {
  const n = BOARD_SIZE;
  showToast('Ходов нет — новое поле, мана сгорела');
  if (battle) {
    for (const side of ['hero', 'enemy'])
      for (const id of MANA_COLORS) battle[side].mana[id] = 0;
    renderBattle();
  }
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
