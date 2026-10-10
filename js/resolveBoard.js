// После хода: срабатывают и убираются ряды, фишки падают, сверху новые — пока есть совпадения.
// Ряд из EXTRA_TURN_RUN+ даёт ещё один ход. Если ходов не осталось — новое поле.
// Возвращает { extra }.
async function resolveBoard() {
  let extra = false;
  for (;;) {
    const cells = findMatches(match3.grid);
    if (!cells.length) break;
    if (longestRun(match3.grid) >= EXTRA_TURN_RUN) extra = true;
    applyMatchEffects(cells);
    vibrate(15);
    await clearGems(cells);
    await collapseAndRefill();
  }
  if (!findPossibleMove(match3.grid)) await rebuildBoard();
  return { extra };
}
