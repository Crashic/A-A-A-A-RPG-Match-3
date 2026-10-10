// Возвращает персонажа из ячейки n или null, если ячейка пустая.
// Записи без класса — заготовки старых версий, их не считаем персонажами.
function loadSlot(n) {
  let save = null;
  try { save = JSON.parse(localStorage.getItem(slotKey(n))); } catch (e) {}
  return save && save.classId ? save : null;
}
