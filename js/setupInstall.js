// «Установить приложение» (настройки): ловит предложение браузера установить PWA (beforeinstallprompt),
// по кнопке показывает его — игра встанет ярлыком на телефон и будет открываться без рамок браузера
// (manifest: display fullscreen, landscape). Если браузер предложение не дал — подсказка, как добавить вручную.
let installPrompt = null;
function setupInstall() {
  const btn = document.getElementById('btnInstall');
  const installed = () => matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches || navigator.standalone;
  const update = () => {
    btn.disabled = installed();
    btn.textContent = installed() ? 'Приложение установлено' : 'Установить приложение';
  };
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; update(); });
  window.addEventListener('appinstalled', () => { installPrompt = null; showToast('Готово! Ярлык игры — на главном экране.', 3000); update(); });
  btn.addEventListener('click', async e => {
    e.stopPropagation();
    vibrate();
    if (installed()) return;
    if (installPrompt) {
      installPrompt.prompt();
      const r = await installPrompt.userChoice;
      installPrompt = null;
      if (r.outcome !== 'accepted') showToast('Ну и ладно. Передумаете — кнопка тут.');
      update();
      return;
    }
    showConfirm('Браузер пока не предложил установку. Откройте меню браузера (⋮) и выберите «Установить приложение» или «Добавить на главный экран». ' +
      'Ярлык появится на телефоне, и игра будет запускаться во весь экран, без рамок браузера.', 'Понятно', () => {}, 'green');
  });
  update();
}
