// Показывает ход на поле: обе фишки мигают, как подсказка (до следующего хода).
function showBestMove(gemId) {
  const move = bestMoveFor(match3.grid, gemId);
  if (!move) return false;
  clearHint();
  for (const [r, c] of [move.a, move.b]) {
    const el = match3.els[r][c];
    if (el) el.classList.add('hint');
  }
  return true;
}
