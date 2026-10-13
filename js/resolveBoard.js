// После хода: над рядами всплывает, что они дали, ряды срабатывают и убираются, фишки падают, сверху новые — пока есть совпадения.
// Ряд из EXTRA_TURN_RUN+ или группа из EXTRA_TURN_GROUP+ (earnsExtraTurn) даёт ещё один ход. Если ходов не осталось — новое поле.
// Возвращает { extra }.
async function resolveBoard() {
  let extra = false;
  for (;;) {
    const cells = findMatches(match3.grid);
    if (!cells.length) break;
    if (earnsExtraTurn(match3.grid, cells)) extra = true;
    const gains = applyMatchEffects(cells);
    if (battle) showGemLabels(cells, gains); // подписи «Урон 24», «+3 маны»… над рядом
    vibrate(15);
    await clearGems(cells);
    await collapseAndRefill();
  }
  if (!findPossibleMove(match3.grid)) await rebuildBoard();
  return { extra };
}
