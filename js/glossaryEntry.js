// Запись глоссария: значок (svg-строка или ''), заголовок, подзаголовок и строки текста.
// lines — массив строк или [класс, строка] (класс: 'lore' — курсив, 'list' — мелкий список).
function glossaryEntry(icon, title, sub, lines = []) {
  const el = document.createElement('article');
  el.className = 'gEntry';
  el.innerHTML = (icon ? '<div class="gIcon">' + icon + '</div>' : '') + '<div class="gBody"><h4></h4></div>';
  const body = el.querySelector('.gBody');
  body.querySelector('h4').textContent = title;
  if (sub) {
    const s = document.createElement('p');
    s.className = 'gSub';
    s.textContent = sub;
    body.appendChild(s);
  }
  for (const line of lines) {
    if (!line) continue;
    const [cls, text] = Array.isArray(line) ? line : ['', line];
    const p = document.createElement('p');
    if (cls) p.className = 'g-' + cls;
    p.textContent = text;
    body.appendChild(p);
  }
  return el;
}
