// Оценка хода для врага: урон важнее всего, потом щит (если не полный), мана, лишний ход.
function scoreMove(grid, move, me) {
  swapInGrid(grid, move.a, move.b);
  const cells = findMatches(grid);
  const count = countGems(grid, cells);
  const run = longestRun(grid);
  swapInGrid(grid, move.a, move.b);
  let score = 0;
  for (const id in count) {
    const kind = GEM_EFFECTS[id].kind;
    if (kind === 'damage') score += count[id] * 10;
    else if (kind === 'shield') score += me.shield < me.maxShield ? count[id] * 5 : 1;
    else if (kind === 'mana') score += count[id] * 3;
    else score += count[id];
  }
  if (run >= EXTRA_TURN_RUN) score += 25;
  return score + Math.random() * 4; // немного случайности, чтобы враг не был предсказуем
}
