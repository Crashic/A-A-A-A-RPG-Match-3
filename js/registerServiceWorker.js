// Офлайн-режим и автообновление.
// Новая версия ищется при запуске и при каждом возврате в приложение;
// как только она установлена, страница перезагружается сама.
function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !location.protocol.startsWith('http')) return;

  let hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController) { hadController = true; return; } // первая установка — перезагрузка не нужна
    if (reloading) return;
    reloading = true;
    showToast(tr("ui.Обновление установлено"));
    setTimeout(() => location.reload(), 600);
  });

  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(reg => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reg.update().catch(() => {});
    });
  }).catch(() => {});
}
