// На телефоне в обычном браузере разворачивает игру на весь экран по первому касанию,
// если полноэкранный режим включён в настройках. На ПК не срабатывает сам —
// там его включают переключателем в настройках.
// Установленное приложение и так открывается во весь экран (manifest).
function enterFullscreen() {
  const installed = matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches;
  const touch = matchMedia('(pointer: coarse)').matches;
  if (installed || !touch) return;
  document.addEventListener('pointerup', () => {
    if (settings.fullscreen) setFullscreen(true);
  }, { once: true });
}
