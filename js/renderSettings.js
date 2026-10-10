// Выставляет на экране настроек текущие значения.
function renderSettings() {
  for (const key of ['music', 'sound']) {
    document.getElementById('set-' + key).value = settings[key];
    document.getElementById('val-' + key).textContent = settings[key] + '%';
  }
  for (const key of ['vibration', 'fullscreen', 'notifications']) {
    document.getElementById('set-' + key).checked = settings[key];
  }
}
