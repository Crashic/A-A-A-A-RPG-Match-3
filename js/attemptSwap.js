// Ход игрока: меняет две соседние фишки. Если ряда не получилось — фишки возвращаются, ход не тратится.
async function attemptSwap(a, b) {
  if (match3.busy || !isAdjacent(a, b) || !isHeroTurn()) return;
  match3.busy = true;
  clearHint();
  selectGem(null);
  const current = battle;
  const result = await swapAndResolve(a, b);
  if (battle !== current) return; // бой сменился, пока шли анимации
  if (result) { await endTurn(result.extra); return; }
  match3.busy = false;
  scheduleHint();
}
