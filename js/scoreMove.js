// Оценка хода для врага: урон важнее всего, потом щит (если не полный), мана, лишний ход;
// Радиацию и Документы старается не трогать (кроме фишек из enemy.needs — под будущие навыки врага).
function scoreMove(grid, move, me) {
  swapInGrid(grid, move.a, move.b);
  const cells = findMatches(grid);
  const count = countGems(grid, cells);
  const extra = earnsExtraTurn(grid, cells);
  swapInGrid(grid, move.a, move.b);
  let score = 0;
  for (const id in count) {
    const kind = GEM_EFFECTS[id].kind;
    if (kind === 'damage') score += count[id] * 10;
    else if (kind === 'shield') score += me.shield < me.maxShield ? count[id] * 5 : 1;
    else if (kind === 'mana') score += count[id] * 3;
    // Радиация и Документы врагу ничего не дают — избегает их, если они не нужны его навыкам (needs)
    else score -= (battle && (battle.enemyInfo.needs || []).includes(id)) ? -count[id] * 3 : count[id] * 2;
  }
  if (extra) score += 25;
  return score + Math.random() * 4; // немного случайности, чтобы враг не был предсказуем
}
