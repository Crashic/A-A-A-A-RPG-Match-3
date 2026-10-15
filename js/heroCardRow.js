// Строка карточки героя: плитка-иконка, подпись мелким моноширинным и значение (item.name или item.html).
function heroCardRow(id, item, label) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = (item ? iconTile(item.icon, item.color) : '') + '<span><small></small><b></b></span>';
  el.querySelector('small').textContent = label;
  const b = el.querySelector('b');
  if (item && item.html) b.innerHTML = item.html; else b.textContent = item ? item.name : '—';
}
