// Рамка вокруг клеток учебного поля [r1, c1, r2, c2] — элемент поверх поля, на него наводится подсказка.
function tutorialFrame(f) {
  let el = document.getElementById('tutFrame');
  if (!el) {
    el = document.createElement('div');
    el.id = 'tutFrame';
    document.getElementById('boardGems').appendChild(el);
  }
  const size = match3.layout.cell;
  el.style.transform = 'translate(' + (cellOffset(f[1]) - 3) + 'px,' + (cellOffset(f[0]) - 3) + 'px)';
  el.style.width = cellOffset(f[3]) - cellOffset(f[1]) + size + 6 + 'px';
  el.style.height = cellOffset(f[2]) - cellOffset(f[0]) + size + 6 + 'px';
  el.hidden = false;
  return el;
}
