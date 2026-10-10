// Короткая вибрация, если она включена в настройках и поддерживается телефоном.
function vibrate(ms = 12) {
  if (settings && settings.vibration && navigator.vibrate) navigator.vibrate(ms);
}
