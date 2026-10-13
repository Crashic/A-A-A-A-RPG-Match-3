// Строка ресурсов аккаунта в лагере (acc.resources): значок и количество, подсказка с названием.
// Пока только показ — пригодятся для построек и крафта.
function campResourceRow() {
  const res = loadAccount().resources || {};
  const row = document.createElement('div');
  row.className = 'campRes';
  for (const r of RESOURCES) {
    const s = document.createElement('span');
    s.className = 'campResItem' + (res[r.id] ? '' : ' none');
    s.dataset.tipTitle = r.name;
    s.dataset.tip = 'Ресурс лагеря. Выпадает с врагов, пригодится для построек и крафта.';
    s.innerHTML = resourceIcon(r.id) + '<b></b>';
    s.querySelector('b').textContent = res[r.id] || 0;
    row.appendChild(s);
  }
  return row;
}
