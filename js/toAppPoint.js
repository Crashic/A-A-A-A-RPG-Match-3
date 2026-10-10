// Переводит точку касания экрана (clientX, clientY) в координаты приложения.
// В повёрнутом режиме экран и приложение развёрнуты на 90°: x приложения идёт вниз по экрану.
function toAppPoint(x, y) {
  if (!isAppRotated()) return { x, y };
  return { x: y, y: window.innerWidth - x };
}
