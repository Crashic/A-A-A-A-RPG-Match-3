// Подсвечивает одну фишку, которой можно сделать ход. Только пока открыт экран игры.
function showHint() {
  if (!match3 || match3.busy || !document.getElementById('game').classList.contains('active')) {
    if (match3) match3.hintTimer = setTimeout(showHint, 1000);
    return;
  }
  const move = findPossibleMove(match3.grid);
  if (!move) return;
  const el = match3.els[move.a[0]][move.a[1]];
  if (el) el.classList.add('hint');
}
