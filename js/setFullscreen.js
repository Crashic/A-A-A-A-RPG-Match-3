// Включает или выключает полноэкранный режим (вызывать по касанию пользователя).
function setFullscreen(on) {
  const doc = document.documentElement;
  if (on && !document.fullscreenElement && doc.requestFullscreen) {
    doc.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
  } else if (!on && document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}
