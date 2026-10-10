// Читает настройки из памяти телефона; новые поля берутся из DEFAULT_SETTINGS.
function loadSettings() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('aaaa-settings')) || {}; } catch (e) {}
  return Object.assign({}, DEFAULT_SETTINGS, saved);
}
