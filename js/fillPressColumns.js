// Раскладывает классы Прессы в две колонки по фракциям (сверху название фракции), нейтральный
// Хронист — посередине внизу. makeTile(cls) — элемент класса.
// compact = false: сетка 2 колонки × 3 строки (экран «Класс»);
// compact = true: две группы рядом, иконки группы в строку (блок «Доступные классы»).
function fillPressColumns(box, makeTile, compact = false) {
  const { columns, neutral } = pressColumns();
  box.classList.add(compact ? 'pressGroups' : 'pressCols');
  if (compact) {
    for (const col of columns) {
      const g = document.createElement('div');
      g.className = 'pressGroup';
      g.innerHTML = '<p class="colTitle"></p><div class="groupRow"></div>';
      g.firstChild.textContent = col.faction.name;
      col.classes.forEach(c => g.lastChild.appendChild(makeTile(c)));
      box.appendChild(g);
    }
    const g = document.createElement('div');
    g.className = 'pressGroup';
    g.innerHTML = '<p class="colTitle">Нейтральный</p><div class="groupRow"></div>';
    neutral.forEach(c => g.lastChild.appendChild(makeTile(c)));
    box.appendChild(g);
    return;
  }
  for (const col of columns) {
    const h = document.createElement('p');
    h.className = 'colTitle';
    h.textContent = col.faction.name;
    box.appendChild(h);
  }
  const rows = Math.max(...columns.map(c => c.classes.length));
  for (let i = 0; i < rows; i++)
    for (const col of columns)
      box.appendChild(col.classes[i] ? makeTile(col.classes[i]) : document.createElement('span'));
  for (const c of neutral) {
    const tile = makeTile(c);
    tile.classList.add('neutral');
    box.appendChild(tile);
  }
}
