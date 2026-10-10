// Повёрнуто ли приложение на 90° (телефон держат вертикально — см. конец css/style.css).
function isAppRotated() {
  return matchMedia('(orientation: portrait) and (pointer: coarse)').matches;
}
