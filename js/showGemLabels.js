// Подписи над собранными фишками: что дал ряд — «Урон 24», «+5 щит», «+3 маны»… (gains — из applyMatchEffects) — по одной на вид фишки,
// в центре собранных клеток этого вида, цветом фишки. Вызывается до того, как фишки исчезнут.
function showGemLabels(cells, gains = {}) {
  const board = document.getElementById('board');
  const groups = {};
  for (const [r, c] of cells) {
    const t = match3.grid[r][c];
    if (t === null) continue;
    const id = GEM_TYPES[t].id;
    (groups[id] = groups[id] || []).push([r, c]);
  }
  const half = match3.layout.cell / 2;
  for (const id in groups) {
    const list = groups[id];
    const y = list.reduce((s, [r]) => s + cellOffset(r), 0) / list.length + half;
    const x = list.reduce((s, [, c]) => s + cellOffset(c), 0) / list.length + half;
    const el = document.createElement('span');
    el.className = 'gemLabel ' + id;
    el.textContent = gainText(id, gains[id]);
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    board.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}
