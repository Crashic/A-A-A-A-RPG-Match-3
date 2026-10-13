// Первый шаг создания: шуточный выбор сервера (он один — Крэшляндия) и режима PvE / PvP / Hardcore.
// Слева — сервер и три режима, справа — описание и «Выбрать происхождение».
function renderServerStep() {
  const d = creation.draft;
  const left = document.getElementById('createLeft');
  left.className = 'panel serverGrid';
  left.innerHTML = '';
  const title = text => { const p = document.createElement('p'); p.className = 'classTitle'; p.textContent = text; left.appendChild(p); };
  title('Сервер');
  for (const s of SERVERS)
    left.appendChild(originButton(s, { selected: d.serverId === s.id }, () => { d.serverId = s.id; renderCreateStep(); }, 'server'));
  title('Режим');
  for (const m of GAME_MODES)
    left.appendChild(originButton(m, { selected: d.modeId === m.id }, () => { d.modeId = m.id; renderCreateStep(); }, 'mode'));

  const right = document.getElementById('createRight');
  right.className = 'panel createInfo';
  right.innerHTML = '';
  const info = document.createElement('div');
  info.className = 'infoText arrowList';
  const add = (tag, text, cls) => { const el = document.createElement(tag); if (cls) el.className = cls; el.textContent = text; info.appendChild(el); };
  const server = findById(SERVERS, d.serverId);
  const mode = findById(GAME_MODES, d.modeId);
  add('h3', server.name);
  add('p', server.status, 'sub');
  add('p', server.description);
  if (mode) {
    add('h3', mode.name + ' — ' + mode.title, 'modeTitle');
    add('p', mode.description);
    add('p', mode.note, 'note');
  } else {
    add('p', 'Выберите режим. Пока он ни на что не влияет, но гордиться им можно уже сейчас.', 'note');
  }
  right.appendChild(info);

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'btn green';
  next.textContent = mode ? 'Выбрать происхождение' : 'Выберите режим';
  next.disabled = !mode;
  next.addEventListener('click', () => { vibrate(); creation.step = 'origin'; renderCreateStep(); });
  right.appendChild(next);
}
