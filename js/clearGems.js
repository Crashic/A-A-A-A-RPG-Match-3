// Убирает совпавшие фишки: они сжимаются и исчезают, клетки становятся пустыми.
async function clearGems(cells) {
  for (const [r, c] of cells) {
    const el = match3.els[r][c];
    if (el) el.classList.add('clearing');
  }
  await sleep(ANIM_CLEAR);
  for (const [r, c] of cells) {
    const el = match3.els[r][c];
    if (el) el.remove();
    match3.els[r][c] = null;
    match3.grid[r][c] = null;
  }
}
