// В обычном браузере разворачивает игру на весь экран по первому касанию,
// если полноэкранный режим включён в настройках.
// Установленное приложение и так открывается во весь экран (manifest).
function enterFullscreen() {
  const installed = matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches;
  if (installed) return;
  document.addEventListener('pointerup', () => {
    if (settings.fullscreen) setFullscreen(true);
  }, { once: true });
}
