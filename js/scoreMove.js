// Оценка хода для врага (чем больше, тем лучше):
// 1) ряд из 4, 5, 6 или группа из 5+ (ещё ход) — не пропускает никогда, даже без урона и маны;
// 2) урон — по 10 за Топливо; 3) щит, если он не полный;
// 4) мешает игроку: забирает с поля фишки маны, нужной его навыкам (heroNeedGems),
//    и выбирает ход, после которого игрок соберёт этой маны меньше всего (bestGatherOf);
// 5) бесполезные врагу фишки (мана, Радиация, Документы) — ноль, кроме нужных его навыкам (enemy.needs).
function scoreMove(grid, move, me) {
  const needs = (battle && battle.enemyInfo.needs) || [];
  const heroNeed = heroNeedGems();
  swapInGrid(grid, move.a, move.b);
  const cells = findMatches(grid);
  const count = countGems(grid, cells);
  const run = longestRun(grid);
  const group = largestGroup(grid, cells);
  const heroLeft = bestGatherOf(grid, heroNeed); // приблизительно: без каскадов
  swapInGrid(grid, move.a, move.b);

  let score = 0;
  if (run >= EXTRA_TURN_RUN) score += 60 + (run - EXTRA_TURN_RUN) * 20;
  else if (group >= EXTRA_TURN_GROUP) score += 60 + (group - EXTRA_TURN_GROUP) * 10;
  for (const id in count) {
    const kind = GEM_EFFECTS[id].kind;
    if (kind === 'damage') score += count[id] * 10;
    else if (kind === 'shield') score += me.shield < me.maxShield ? count[id] * 5 : 0;
    else if (needs.includes(id)) score += count[id] * 3;
    if (heroNeed.includes(id)) score += count[id] * 4; // забрал у игрока его ману
  }
  score -= heroLeft * 3; // сколько нужной маны игрок сможет собрать следующим ходом
  return score + Math.random() * 2; // немного случайности, чтобы враг не был предсказуем
}
