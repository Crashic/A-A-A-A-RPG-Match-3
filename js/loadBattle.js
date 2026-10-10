// Незаконченный бой из ячейки n или null. Поле должно быть целым (9×9, без пустых клеток).
function loadBattle(n) {
  let data = null;
  try { data = JSON.parse(localStorage.getItem(battleKey(n))); } catch (e) {}
  if (!data || !Array.isArray(data.grid) || data.grid.length !== BOARD_SIZE) return null;
  const ok = data.grid.every(row => row.length === BOARD_SIZE &&
    row.every(t => Number.isInteger(t) && t >= 0 && t < GEM_TYPES.length));
  return ok && findEnemy(data.enemyId) ? data : null;
}
