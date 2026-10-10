// Номер выбранной в профиле ячейки (по умолчанию 1).
function getActiveSlot() {
  let n = 1;
  try { n = parseInt(localStorage.getItem('aaaa-active-slot'), 10) || 1; } catch (e) {}
  return Math.min(Math.max(n, 1), SLOT_COUNT);
}
