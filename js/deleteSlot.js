// Удаляет сохранение из ячейки n.
function deleteSlot(n) {
  try { localStorage.removeItem(slotKey(n)); } catch (e) {}
}
