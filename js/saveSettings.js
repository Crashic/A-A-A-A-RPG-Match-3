// Сохраняет текущие настройки.
function saveSettings() {
  try { localStorage.setItem('aaaa-settings', JSON.stringify(settings)); } catch (e) {}
}
