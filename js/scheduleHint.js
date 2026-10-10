// Запускает заново отсчёт бездействия: через HINT_DELAY мс подсвечивается фишка, которой можно походить.
function scheduleHint() {
  clearHint();
  match3.hintTimer = setTimeout(showHint, HINT_DELAY);
}
