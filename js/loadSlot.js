// Возвращает сохранение из ячейки n или null, если она пустая.
function loadSlot(n) {
  try { return JSON.parse(localStorage.getItem(slotKey(n))); } catch (e) { return null; }
}
