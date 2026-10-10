// Враг выбирает самый выгодный ход по scoreMove. null — ходов нет.
function chooseEnemyMove(grid) {
  let best = null, bestScore = -1;
  for (const move of listMoves(grid)) {
    const s = scoreMove(grid, move, battle.enemy);
    if (s > bestScore) { best = move; bestScore = s; }
  }
  return best;
}
