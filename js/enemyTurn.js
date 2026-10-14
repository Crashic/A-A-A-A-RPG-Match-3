// Ход врага: пауза, навык за ману (если готов), показывает выбранную фишку и делает обмен.
async function enemyTurn() {
  const current = battle;
  match3.busy = true;
  clearHint();
  battle.skill.lastEnemyLoss = { hp: 0, shield: 0 }; // для «Разрыва хронологии»
  await sleep(ENEMY_THINK_MS);
  if (battle !== current) return;
  if (!tutorialActive()) await enemyUseSkill(); // навык врага за ману — ход не тратит (не в сценарии учебного боя)
  if (battle !== current) return;
  if (battle.over) { await endTurn(false); return; }
  const move = (await tutorialEnemyMove()) || chooseEnemyMove(match3.grid); // учебный бой — заготовленный ход
  if (battle !== current) return;
  if (!move) { await rebuildBoard(); if (battle === current) await endTurn(false); return; }
  selectGem(move.a);
  await sleep(ENEMY_SHOW_MS);
  if (battle !== current) return;
  selectGem(null);
  const result = await swapAndResolve(move.a, move.b);
  if (battle !== current) return;
  await endTurn(result ? result.extra : false);
}
