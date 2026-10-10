// После хода: убирает ряды, роняет фишки, добавляет новые — пока появляются совпадения.
// Если ходов не осталось — создаёт новое поле.
async function resolveBoard() {
  for (;;) {
    const cells = findMatches(match3.grid);
    if (!cells.length) break;
    vibrate(15);
    await clearGems(cells);
    await collapseAndRefill();
  }
  if (!findPossibleMove(match3.grid)) await rebuildBoard();
}
