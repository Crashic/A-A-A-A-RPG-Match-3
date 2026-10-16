// Первый шаг создания по макету «Сервер и режим · B «Анкета»» (раскладка как у renderHeroStep):
// слева — сервер (он один — Крэшляндия) и три режима плитками; по центру — плакат «Выбери судьбу!» цвета режима;
// справа — анкета с описанием сервера и режима, «‹ Назад» и «Выбрать происхождение ›».
function renderServerStep() {
  const d = creation.draft;
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const pickRow = (item, selected, onClick) => {
    const b = el('button', 'hsPickRow' + (selected ? ' sel' : ''));
    b.type = 'button';
    b.dataset.tip = item.name;
    b.innerHTML = iconTile(item.icon, item.color) + '<span></span>';
    b.querySelector('span').textContent = item.name;
    b.addEventListener('click', () => { vibrate(); onClick(); });
    return b;
  };

  const left = document.getElementById('createLeft');
  left.className = 'panel hsLeft';
  left.innerHTML = '';
  left.appendChild(el('p', 'hsLab', tr("ui.0 · Сервер")));
  for (const s of SERVERS) left.appendChild(pickRow(s, d.serverId === s.id, () => { d.serverId = s.id; renderCreateStep(); }));
  left.appendChild(el('p', 'hsLab', tr("ui.Режим")));
  for (const m of GAME_MODES) left.appendChild(pickRow(m, d.modeId === m.id, () => { d.modeId = m.id; renderCreateStep(); }));
  const back = el('button', 'btn red hsBack hsLeftBack', tr("ui.‹ Назад"));
  back.type = 'button';
  back.addEventListener('click', () => { vibrate(); createStepBack(); });
  left.appendChild(back);

  const server = findById(SERVERS, d.serverId);
  const mode = findById(GAME_MODES, d.modeId);
  const poster = document.getElementById('createPoster');
  poster.className = 'mode-' + (mode ? mode.id : 'none');
  poster.innerHTML = '<p class="hsSlogan"></p><div class="hsModeBig"></div><p class="hsModeName"></p><p class="hsModeTitle"></p>';
  poster.querySelector('.hsSlogan').textContent = tr("ui.Выбери судьбу!");
  if (mode) {
    poster.querySelector('.hsModeBig').innerHTML = iconTile(mode.icon, mode.color);
    poster.querySelector('.hsModeName').textContent = mode.name;
    poster.querySelector('.hsModeTitle').textContent = mode.title;
  } else poster.querySelector('.hsModeTitle').textContent = tr("ui.Выберите режим слева");

  const right = document.getElementById('createRight');
  right.className = 'paper hsRight hsServer';
  right.innerHTML = '';
  right.appendChild(el('b', 'hsH', server.name));
  const st = el('p', 'hsStatus');
  st.innerHTML = '<span class="hsLamp"></span>';
  st.appendChild(document.createTextNode(server.status));
  right.appendChild(st);
  right.appendChild(el('p', 'hsText', server.description));
  right.appendChild(el('hr', 'hsDash'));
  if (mode) {
    right.appendChild(el('b', 'hsH', mode.name + ' — ' + mode.title));
    right.appendChild(el('p', 'hsText', mode.description));
    right.appendChild(el('p', 'hsNote', mode.note));
  } else right.appendChild(el('p', 'hsNote', tr("ui.Выберите режим. Пока он ни на что не влияет, но гордиться им можно уже сейчас.")));
  const foot = el('div', 'hsFoot');
  const next = el('button', 'btn green hsCreate', mode ? tr("ui.Выбрать происхождение ›") : tr("ui.Выберите режим"));
  next.type = 'button';
  next.disabled = !mode;
  next.addEventListener('click', () => { vibrate(); creation.step = 'origin'; renderCreateStep(); });
  foot.appendChild(next);
  right.appendChild(foot);
}
