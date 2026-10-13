// Клавиатура имени: поле с текущим именем, буквы (первая буква слова — заглавная),
// пробел, дефис, стереть, «Готово».
function renderKeyboard() {
  const d = creation.draft;
  document.getElementById('kbValue').textContent = d.name || ' ';
  const keys = document.getElementById('kbKeys');
  if (keys.dataset.built) return;
  keys.dataset.built = '1';
  const press = fn => e => { e.preventDefault(); vibrate(8); fn(); renderKeyboard(); };
  const addKey = (row, label, fn, cls = '') => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'key ' + cls;
    b.textContent = label;
    b.addEventListener('pointerdown', press(fn));
    row.appendChild(b);
  };
  const type = ch => {
    const name = creation.draft.name;
    if (name.length >= NAME_MAX_LENGTH) return;
    const start = !name || /[\s-]$/.test(name);
    creation.draft.name = name + (start ? ch.toUpperCase() : ch);
  };
  KEYBOARD_ROWS.forEach((letters, i) => {
    const row = document.createElement('div');
    row.className = 'kbRow';
    for (const ch of letters) addKey(row, ch, () => type(ch));
    if (i === KEYBOARD_ROWS.length - 1)
      addKey(row, '⌫', () => { creation.draft.name = creation.draft.name.slice(0, -1); }, 'wide');
    keys.appendChild(row);
  });
  const row = document.createElement('div');
  row.className = 'kbRow';
  addKey(row, tr("ui.Случайное"), () => { creation.draft.name = randomName(); }, 'wide');
  addKey(row, '-', () => type('-'));
  addKey(row, tr("ui.пробел"), () => {
    const n = creation.draft.name;
    if (n && !/\s$/.test(n) && n.length < NAME_MAX_LENGTH) creation.draft.name = n + ' ';
  }, 'space');
  addKey(row, tr("ui.Готово"), closeKeyboard, 'done');
  keys.appendChild(row);
}
