// Окно «Читер»: переключатель «Активировать читы» (settings.cheatsOn), уровень, изолента (синяя, чёрная, белая) и прибавка к пяти характеристикам
// текущего героя — каждая строка с кнопками −10, −1, +1, +10; внизу — «Выдать предмет» по редкостям.
function renderCheat() {
  const body = document.getElementById('cheatBody');
  const hero = loadSlot(getActiveSlot());
  body.innerHTML = '';
  if (!hero) { body.innerHTML = '<p class="hint">Сначала создайте персонажа — читерить не на ком.</p>'; return; }
  // переключатель «Активировать читы»
  const toggle = document.createElement('label');
  toggle.className = 'setRow cheatToggle';
  toggle.innerHTML = '<span><b>Активировать читы</b><small>Очки характеристик можно менять и в бою; в бою появляется навык «KILL ALL».</small></span>' +
    '<input type="checkbox" class="switch">';
  const box = toggle.querySelector('input');
  box.checked = !!settings.cheatsOn;
  box.addEventListener('change', () => {
    settings.cheatsOn = box.checked;
    saveSettings();
    vibrate();
    if (battle && !battle.over) renderBattle(); // показать или убрать «KILL ALL»
  });
  body.appendChild(toggle);
  const bonus = cheatBonus(hero);
  const tape = {};
  let rest = hero.tape || 0;
  for (const k of TAPE_KINDS) { tape[k.id] = Math.floor(rest / k.value); rest -= tape[k.id] * k.value; }
  const rows = [
    { field: 'level', icon: '', label: 'Уровень', value: hero.level },
    ...TAPE_KINDS.map(k => ({ field: k.id, icon: '<i class="roll ' + k.id + '"></i>', label: k.name[0].toUpperCase() + k.name.slice(1) + ' изолента', value: tape[k.id] })),
    ...STATS.map(s => ({ field: s.id, icon: iconTile(s.icon, s.color), label: s.name + ' (прибавка)', value: (bonus[s.id] > 0 ? '+' : '') + bonus[s.id] }))
  ];
  for (const r of rows) {
    const row = document.createElement('div');
    row.className = 'cheatRow';
    row.innerHTML = '<span class="cheatIcon">' + r.icon + '</span><span class="cheatLabel"></span>' +
      '<button type="button" class="btn stone cheatBtn" data-d="-10">−10</button>' +
      '<button type="button" class="btn stone cheatBtn" data-d="-1">−1</button>' +
      '<b class="cheatVal"></b>' +
      '<button type="button" class="btn green cheatBtn" data-d="1">+1</button>' +
      '<button type="button" class="btn green cheatBtn" data-d="10">+10</button>';
    row.querySelector('.cheatLabel').textContent = r.label;
    row.querySelector('.cheatVal').textContent = r.value;
    row.querySelectorAll('.cheatBtn').forEach(b => b.addEventListener('click', e => {
      e.stopPropagation();
      changeCheat(r.field, Number(b.dataset.d));
    }));
    body.appendChild(row);
  }
  // выдать случайный предмет уровня героя нужной редкости
  const give = document.createElement('div');
  give.className = 'cheatRow cheatItems';
  give.innerHTML = '<span class="cheatIcon"></span><span class="cheatLabel">Выдать предмет</span>';
  for (const r of ITEM_RARITIES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn stone cheatBtn';
    b.textContent = r.name;
    b.style.color = r.color;
    b.addEventListener('click', e => { e.stopPropagation(); cheatGiveItem(r.id); });
    give.appendChild(b);
  }
  body.appendChild(give);
}
