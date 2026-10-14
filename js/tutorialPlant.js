// Учебный бой: «сажает» на поле фишки фазы ph (TUTORIAL_PHASES) — меняет как можно меньше клеток.
// Проверяет, что готовых рядов нет, а разрешённый обмен даёт ровно задуманный ряд (и ещё ход — только
// если ряд из 4+). Изменённые фишки подпрыгивают (класс tutPop). Возвращает true, если получилось.
function tutorialPlant(ph) {
  const n = BOARD_SIZE;
  const idOf = id => GEM_TYPES.findIndex(g => g.id === id);
  const type = idOf(ph.gem === 'mana' ? tutorialManaGem() : ph.gem);
  const key = (r, c) => r * n + c;
  const planted = new Set(ph.plant.map(([r, c]) => key(r, c)));
  // разрешённые обмены (swaps — несколько, иначе один swap); ряд каждого: неподвижные клетки (core или посаженные
  // без той, что уезжает) + клетка, куда приезжает фишка
  const swaps = ph.swaps || [ph.swap];
  const lineOf = sw => (ph.core || ph.plant.filter(([r, c]) => !(r === sw[0][0] && c === sw[0][1]))).concat([sw[1]]);
  const other = () => { let t; do { t = Math.floor(Math.random() * GEM_TYPES.length); } while (t === type); return t; };
  for (let attempt = 0; attempt < 400; attempt++) {
    const g = match3.grid.map(row => row.slice());
    for (const [r, c] of ph.plant) g[r][c] = type;
    for (const sw of swaps) if (g[sw[1][0]][sw[1][1]] === type) g[sw[1][0]][sw[1][1]] = other();
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
    const ok = swaps.every(swp => { // каждый разрешённый обмен даёт ровно свой ряд (и ещё ход — только за 4+)
      const line = lineOf(swp);
      const lineSet = new Set(line.map(([r, c]) => key(r, c)));
      const sw = g.map(row => row.slice());
      swapInGrid(sw, swp[0], swp[1]);
      const mm = findMatches(sw);
      return mm.length === lineSet.size && mm.every(([r, c]) => lineSet.has(key(r, c))) && earnsExtraTurn(sw, mm) === (line.length >= EXTRA_TURN_RUN);
    });
    if (!ok) continue;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      if (g[r][c] === match3.grid[r][c]) continue;
      setGemType(r, c, g[r][c]);
      match3.els[r][c].classList.add('tutPop');
    }
    return true;
  }
  return false;
}
