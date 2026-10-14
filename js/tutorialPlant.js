// Учебный бой: «сажает» на поле фишки фазы ph (TUTORIAL_PHASES) — меняет как можно меньше клеток.
// Проверяет, что готовых рядов нет, а разрешённый обмен даёт ровно задуманный ряд (и ещё ход — только
// если ряд из 4+). Изменённые фишки подпрыгивают (класс tutPop). Возвращает true, если получилось.
function tutorialPlant(ph) {
  const n = BOARD_SIZE;
  const idOf = id => GEM_TYPES.findIndex(g => g.id === id);
  const type = idOf(ph.gem === 'mana' ? tutorialManaGem() : ph.gem);
  const key = (r, c) => r * n + c;
  const planted = new Set(ph.plant.map(([r, c]) => key(r, c)));
  // ряд после обмена: посаженные клетки, но та, что уезжает, заменяется клеткой, куда она приезжает
  const line = ph.plant.filter(([r, c]) => !(r === ph.swap[0][0] && c === ph.swap[0][1])).concat([ph.swap[1]]);
  const lineSet = new Set(line.map(([r, c]) => key(r, c)));
  const wantExtra = line.length >= EXTRA_TURN_RUN;
  const other = () => { let t; do { t = Math.floor(Math.random() * GEM_TYPES.length); } while (t === type); return t; };
  for (let attempt = 0; attempt < 400; attempt++) {
    const g = match3.grid.map(row => row.slice());
    for (const [r, c] of ph.plant) g[r][c] = type;
    if (g[ph.swap[1][0]][ph.swap[1][1]] === type) g[ph.swap[1][0]][ph.swap[1][1]] = other();
    if (attempt) for (let k = 0; k < 3 + attempt % 6; k++) { // перетряхнуть соседей рамки
      const r = Math.max(0, Math.min(n - 1, ph.plant[0][0] + Math.floor(Math.random() * 5) - 2));
      const c = Math.max(0, Math.min(n - 1, ph.plant[0][1] + Math.floor(Math.random() * 7) - 2));
      if (!planted.has(key(r, c))) g[r][c] = other();
    }
    for (let fix = 0; fix < 200; fix++) { // убрать случайные готовые ряды
      const m = findMatches(g).filter(([r, c]) => !planted.has(key(r, c)));
      if (!m.length) break;
      const [r, c] = m[Math.floor(Math.random() * m.length)];
      g[r][c] = Math.floor(Math.random() * GEM_TYPES.length);
    }
    if (findMatches(g).length) continue;
    const sw = g.map(row => row.slice());
    swapInGrid(sw, ph.swap[0], ph.swap[1]);
    const mm = findMatches(sw);
    if (mm.length !== lineSet.size || !mm.every(([r, c]) => lineSet.has(key(r, c)))) continue;
    if (earnsExtraTurn(sw, mm) !== wantExtra) continue;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      if (g[r][c] === match3.grid[r][c]) continue;
      setGemType(r, c, g[r][c]);
      match3.els[r][c].classList.add('tutPop');
    }
    return true;
  }
  return false;
}
