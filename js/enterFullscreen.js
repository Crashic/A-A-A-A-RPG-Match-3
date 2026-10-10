// В обычном браузере разворачивает игру на весь экран по первому касанию.
// Установленное приложение и так открывается во весь экран (manifest).
function enterFullscreen() {
  const installed = matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches;
  if (installed || !document.documentElement.requestFullscreen) return;
  document.addEventListener('pointerup', () => {
    document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
  }, { once: true });
}
