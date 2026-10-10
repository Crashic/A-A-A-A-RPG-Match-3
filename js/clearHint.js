// Убирает подсказку и останавливает таймер бездействия.
function clearHint() {
  if (!match3) return;
  clearTimeout(match3.hintTimer);
  match3.hintTimer = null;
  document.querySelectorAll('.gem.hint').forEach(el => el.classList.remove('hint'));
}
