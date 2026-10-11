// Экран «Происхождение». Слева две колонки: сверху Совет и Союз, под каждой по три расы,
// внизу посередине — Пресса (фракция и раса сразу). Справа — описание выбранного,
// под ним «Доступные классы» (классы расы — цветные, остальные классы фракции — чёрно-белые)
// и кнопка «Выбрать класс».
function renderOriginStep() {
  const d = creation.draft;
  const left = document.getElementById('createLeft');
  left.className = 'panel originGrid';
  left.innerHTML = '';
  const sides = FACTIONS.filter(f => f.id !== 'press');
  for (const f of sides)
    left.appendChild(originButton(f, { selected: d.factionId === f.id }, () => pickFaction(f.id), 'faction'));
  const byFaction = sides.map(f => RACES.filter(r => r.factionId === f.id));
  const dimRace = r => !!d.factionId && r.factionId !== d.factionId;
  for (let i = 0; i < 3; i++)
    for (const list of byFaction)
      left.appendChild(originButton(list[i], { selected: d.raceId === list[i].id, dim: dimRace(list[i]) },
        () => pickRace(list[i].id), 'race'));
  const press = findById(RACES, 'press');
  left.appendChild(originButton(press, { selected: d.raceId === 'press', dim: dimRace(press) },
    () => pickRace('press'), 'race press'));

  const right = document.getElementById('createRight');
  right.className = 'panel createInfo';
  right.innerHTML = '';
  const race = findById(RACES, d.raceId);
  const faction = findById(FACTIONS, d.factionId);
  if (!faction) {
    right.innerHTML = '<p class="hint">Выберите фракцию или расу. Пресса — отдельная нейтральная фракция посередине.</p>';
    return;
  }
  const info = document.createElement('div');
  info.className = 'infoText';
  const add = (tag, text, cls) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    el.textContent = text;
    info.appendChild(el);
  };
  add('h3', race ? race.name : faction.name);
  add('p', race && race.id !== 'press' ? faction.name : faction.alias, 'sub');
  if (race) {
    if (race.id === 'press') {
      add('p', 'Начинает игру по фракции класса: Совет — «Учёт и Ржавчина», Союз — «Ветер и Торговля», Хронист — «Учёт и Ржавчина»', 'start');
    } else {
      const start = startZoneOf(race.id);
      add('p', 'Начинает игру: ' + start.name + ' (ур. ' + start.min + '–' + start.max + ')', 'start');
    }
    add('p', race.note, 'note');
  }
  add('p', faction.motto, 'motto');
  add('p', faction.description);
  const own = ZONES.filter(z => z.factionId === faction.id).map(z => z.name);
  add('p', own.length ? 'Локации: ' + own.join(', ') + ' и нейтральные'
    : 'Локации: фракции своего класса и нейтральные (Хронист — все)', 'sub');
  right.appendChild(info);

  // «Доступные классы» фракции: доступные выбранной расе — цветные, остальные — чёрно-белые
  const allowed = race ? raceClasses(race.id) : null;
  const block = document.createElement('div');
  block.className = 'classBlock';
  block.innerHTML = '<p class="classTitle">Доступные классы</p><div class="classRow"></div>';
  const row = block.lastChild;
  const mini = c => {
    const tile = document.createElement('span');
    tile.className = 'mini' + (allowed && !allowed[c.id] ? ' dim' : '');
    tile.dataset.tip = c.name;
    tile.innerHTML = iconTile(c.icon, c.color) + '<small></small>';
    tile.querySelector('small').textContent = c.name.replace('‑Репортёр', '');
    return tile;
  };
  // у Прессы — две колонки по фракциям классов, Хронист посередине
  if (faction.id === 'press') fillPressColumns(row, mini, true);
  else for (const c of factionClassList(faction.id)) row.appendChild(mini(c));
  right.appendChild(block);

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'btn green';
  next.textContent = race ? 'Выбрать класс' : 'Выберите расу';
  next.disabled = !race;
  next.addEventListener('click', () => { vibrate(); openClassStep(); });
  right.appendChild(next);
}
