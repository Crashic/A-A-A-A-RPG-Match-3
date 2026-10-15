// Незаконченный бой из ячейки n или null. Поле должно быть целым (BOARD_SIZE × BOARD_SIZE, без пустых клеток);
// поле другого размера (бой, сохранённый до перехода 9×9 → 8×8) заменяется новым — бой продолжается.
function loadBattle(n) {
  let data = null;
  try { data = JSON.parse(localStorage.getItem(battleKey(n))); } catch (e) {}
  if (!data || !Array.isArray(data.grid) || !findEnemy(data.enemyId)) return null;
  const ok = data.grid.length === BOARD_SIZE && data.grid.every(row => Array.isArray(row) && row.length === BOARD_SIZE &&
    row.every(t => Number.isInteger(t) && t >= 0 && t < GEM_TYPES.length));
  if (!ok) data.grid = generateGrid();
  return data;
}
