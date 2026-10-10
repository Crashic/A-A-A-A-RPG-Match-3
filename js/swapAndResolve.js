// Меняет две соседние фишки. Нет ряда — возвращает обратно и отдаёт null,
// иначе снимает все ряды и возвращает { extra } — заработан ли ещё один ход.
async function swapAndResolve(a, b) {
  const elA = match3.els[a[0]][a[1]];
  const elB = match3.els[b[0]][b[1]];
  swapInGrid(match3.grid, a, b);
  swapInGrid(match3.els, a, b);
  placeGem(elA, b[0], b[1], ANIM_SWAP);
  placeGem(elB, a[0], a[1], ANIM_SWAP);
  await sleep(ANIM_SWAP);
  if (findMatches(match3.grid).length) return resolveBoard();
  vibrate(8);
  swapInGrid(match3.grid, a, b);
  swapInGrid(match3.els, a, b);
  placeGem(elA, a[0], a[1], ANIM_SWAP);
  placeGem(elB, b[0], b[1], ANIM_SWAP);
  await sleep(ANIM_SWAP);
  return null;
}
