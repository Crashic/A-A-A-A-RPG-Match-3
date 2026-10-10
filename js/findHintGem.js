// Для подсказки: из пары возможного хода выбирает ту фишку, которая сама встанет в ряд из 3+.
// Возвращает [r, c] этой фишки или null, если ходов нет.
function findHintGem(grid) {
  const move = findPossibleMove(grid);
  if (!move) return null;
  const { a, b } = move;
  swapInGrid(grid, a, b);
  const matched = findMatches(grid);
  swapInGrid(grid, a, b);
  const inMatch = cell => matched.some(m => m[0] === cell[0] && m[1] === cell[1]);
  // фишка из a после хода стоит в b: если b в ряду — собирает ряд она, иначе — фишка из b
  return inMatch(b) ? a : b;
}
