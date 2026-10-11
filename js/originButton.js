// Кнопка-плитка выбора (фракция, раса, класс, пол): иконка и подпись.
// state: { selected, dim } — выбрана / недоступна (чёрно-белая). onClick — обработчик.
function originButton(item, state, onClick, cls = '') {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'pick ' + cls + (state.selected ? ' selected' : '') + (state.dim ? ' dim' : '');
  b.innerHTML = iconTile(item.icon, item.color) + '<span></span>';
  b.querySelector('span').textContent = item.short || item.name;
  b.dataset.tip = item.name;
  b.addEventListener('click', () => { vibrate(); onClick(); });
  return b;
}
