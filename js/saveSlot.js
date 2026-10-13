// Записывает сохранение в ячейку n и обновляет дату последней игры.
function saveSlot(n, data) {
  data.updated = Date.now();
  data.version = APP_VERSION;
  try { localStorage.setItem(slotKey(n), JSON.stringify(data)); } catch (e) {}
  updateNotifyBadges(); // «!» на Заданиях и Персонаже
}
