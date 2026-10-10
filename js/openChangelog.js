// Открывает окно со списком изменений.
function openChangelog() {
  const list = document.getElementById('changelogList');
  list.innerHTML = '';
  for (const entry of CHANGELOG) {
    const block = document.createElement('section');
    const head = document.createElement('h3');
    head.textContent = 'v' + entry.version;
    const date = document.createElement('span');
    date.textContent = entry.date;
    head.appendChild(date);
    const ul = document.createElement('ul');
    for (const text of entry.changes) {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    }
    block.append(head, ul);
    list.appendChild(block);
  }
  document.getElementById('changelog').classList.add('open');
}
