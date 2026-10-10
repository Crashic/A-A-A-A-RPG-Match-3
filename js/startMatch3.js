// Запускает поле «3 в ряд» на экране боя: новое или сохранённое (grid).
// Ход игрока начинается, когда фишки упали (поле busy до тех пор).
async function startMatch3(grid = null) {
  if (match3) clearHint();
  document.getElementById('boardGems').innerHTML = '';
  match3 = { grid: grid || generateGrid(), els: [], busy: true, selected: null, hintTimer: null, layout: null };
  const current = match3;
  match3.layout = computeBoardLayout();
  renderBoardCells();
  await dropInGrid();
  if (match3 !== current) return;
  if (isHeroTurn()) { match3.busy = false; renderSkillBar(); scheduleHint(); }
}
