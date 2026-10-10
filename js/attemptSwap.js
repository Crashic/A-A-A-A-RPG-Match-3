// Ход: меняет две соседние фишки. Если ряда не получилось — возвращает их обратно.
async function attemptSwap(a, b) {
  if (match3.busy || !isAdjacent(a, b)) return;
  match3.busy = true;
  clearHint();
  selectGem(null);
  const elA = match3.els[a[0]][a[1]];
  const elB = match3.els[b[0]][b[1]];
  swapInGrid(match3.grid, a, b);
  swapInGrid(match3.els, a, b);
  placeGem(elA, b[0], b[1], ANIM_SWAP);
  placeGem(elB, a[0], a[1], ANIM_SWAP);
  await sleep(ANIM_SWAP);
  if (findMatches(match3.grid).length) {
    await resolveBoard();
  } else {
    vibrate(8);
    swapInGrid(match3.grid, a, b);
    swapInGrid(match3.els, a, b);
    placeGem(elA, a[0], a[1], ANIM_SWAP);
    placeGem(elB, b[0], b[1], ANIM_SWAP);
    await sleep(ANIM_SWAP);
  }
  match3.busy = false;
  scheduleHint();
}
