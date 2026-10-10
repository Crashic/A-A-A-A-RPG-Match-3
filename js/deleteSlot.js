// Удаляет сохранение из ячейки n (и его незаконченный бой).
function deleteSlot(n) {
  try { localStorage.removeItem(slotKey(n)); } catch (e) {}
  clearBattle(n);
}
