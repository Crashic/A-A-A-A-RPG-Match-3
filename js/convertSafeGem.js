// Превращает 1 случайную фишку в тип type там, где это не складывает ряд (поле остаётся спокойным).
function convertSafeGem(type) {
  const n = BOARD_SIZE;
  const cells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (match3.grid[r][c] !== type) cells.push([r, c]);
  cells.sort(() => Math.random() - 0.5);
  for (const [r, c] of cells) {
    const was = match3.grid[r][c];
    match3.grid[r][c] = type;
    const calm = !findMatches(match3.grid).length;
    match3.grid[r][c] = was;
    if (calm) { setGemType(r, c, type); return; }
  }
}
