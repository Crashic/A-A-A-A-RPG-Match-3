// Возвращает персонажа из ячейки n или null, если ячейка пустая.
// Записи без класса — заготовки старых версий, их не считаем персонажами.
// У персонажей старых версий нет уровня, опыта и золота — подставляем начальные.
function loadSlot(n) {
  let save = null;
  try { save = JSON.parse(localStorage.getItem(slotKey(n))); } catch (e) {}
  if (!save || !save.classId) return null;
  return Object.assign({ level: 1, xp: 0, gold: 0, lastEnemy: null }, save);
}
