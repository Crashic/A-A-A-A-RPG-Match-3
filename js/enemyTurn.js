// Ход врага: пауза, показывает выбранную фишку и делает обмен.
async function enemyTurn() {
  const current = battle;
  match3.busy = true;
  clearHint();
  await sleep(ENEMY_THINK_MS);
  if (battle !== current) return;
  const move = chooseEnemyMove(match3.grid);
  if (!move) { await rebuildBoard(); if (battle === current) await endTurn(false); return; }
  selectGem(move.a);
  await sleep(ENEMY_SHOW_MS);
  if (battle !== current) return;
  selectGem(null);
  const result = await swapAndResolve(move.a, move.b);
  if (battle !== current) return;
  await endTurn(result ? result.extra : false);
}
