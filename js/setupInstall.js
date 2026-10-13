// «Установить приложение» (настройки): ловит предложение браузера установить PWA (beforeinstallprompt),
// по кнопке показывает его — игра встанет ярлыком на телефон и будет открываться без рамок браузера
// (manifest: display fullscreen, landscape). Если браузер предложение не дал — подсказка, как добавить вручную.
let installPrompt = null;
function setupInstall() {
  const btn = document.getElementById('btnInstall');
  // Полный экран браузера (enterFullscreen) тоже даёт display-mode: fullscreen — это ещё НЕ установленная игра.
  const installed = () => navigator.standalone ||
    (matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches && !document.fullscreenElement);
  const update = () => {
    btn.disabled = installed();
    btn.textContent = installed() ? tr("ui.Приложение установлено") : tr("ui.Установить приложение");
  };
  document.addEventListener('fullscreenchange', update);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; update(); });
  window.addEventListener('appinstalled', () => { installPrompt = null; showToast(tr("ui.Готово! Ярлык игры — на главном экране."), 3000); update(); });
  btn.addEventListener('click', async e => {
    e.stopPropagation();
    vibrate();
    if (installed()) return;
    if (installPrompt) {
      try {
        if (document.fullscreenElement) await document.exitFullscreen().catch(() => {}); // окно установки Chrome — поверх обычной страницы
        installPrompt.prompt();
        const r = await installPrompt.userChoice;
        installPrompt = null;
        if (r.outcome !== 'accepted') showToast(tr("ui.Ну и ладно. Передумаете — кнопка тут."));
        update();
        return;
      } catch (err) { installPrompt = null; } // предложение уже использовано — ниже инструкция
    }
    showConfirm(tr("ui.Браузер пока не предложил установку. Выйдите из полного экрана, откройте меню браузера (⋮) и выберите «Установить приложение» или «Добавить на главный экран». ") +
      tr("ui.Ярлык появится на телефоне, и игра будет запускаться во весь экран, без рамок браузера."), tr("ui.Понятно"), () => {}, 'green');
  });
  update();
}
