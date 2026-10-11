// Даёт ли сбор ещё один ход: ряд из EXTRA_TURN_RUN+ подряд
// или EXTRA_TURN_GROUP+ одинаковых фишек вместе (крестом, буквой «Г» или «Т»).
function earnsExtraTurn(grid, cells) {
  return longestRun(grid) >= EXTRA_TURN_RUN || largestGroup(grid, cells) >= EXTRA_TURN_GROUP;
}
