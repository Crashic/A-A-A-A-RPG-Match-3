// Удаляет сохранённый незаконченный бой ячейки n.
function clearBattle(n) {
  try { localStorage.removeItem(battleKey(n)); } catch (e) {}
}
