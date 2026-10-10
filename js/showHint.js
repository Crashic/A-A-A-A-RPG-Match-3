// Мигает одна фишка — та, которая при ходе соберёт ряд из 3 и больше. Только пока открыт экран игры.
function showHint() {
  if (!match3 || match3.busy || !document.getElementById('game').classList.contains('active')) {
    if (match3) match3.hintTimer = setTimeout(showHint, 1000);
    return;
  }
  const cell = findHintGem(match3.grid);
  if (!cell) return;
  const el = match3.els[cell[0]][cell[1]];
  if (el) el.classList.add('hint');
}
