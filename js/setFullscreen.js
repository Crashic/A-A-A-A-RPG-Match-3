// Включает или выключает полноэкранный режим (вызывать по касанию пользователя).
// После входа в полный экран закрепляет горизонтальную ориентацию.
function setFullscreen(on) {
  const doc = document.documentElement;
  if (on && !document.fullscreenElement && doc.requestFullscreen) {
    doc.requestFullscreen({ navigationUI: 'hide' }).then(lockLandscape).catch(() => {});
  } else if (!on && document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}
