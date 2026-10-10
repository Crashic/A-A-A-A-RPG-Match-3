// Экран «Происхождение». Слева две колонки: сверху иконки фракций, под ними по три расы,
// внизу посередине — нейтральная Пресса. Справа — описание выбранного и классы
// (доступные — цветные, недоступные — чёрно-белые), внизу «Выбрать класс».
function renderOriginStep() {
  const d = creation.draft;
  const left = document.getElementById('createLeft');
  left.className = 'panel originGrid';
  left.innerHTML = '';
  for (const f of FACTIONS)
    left.appendChild(originButton(f, { selected: d.factionId === f.id }, () => pickFaction(f.id), 'faction'));
  // расы по строкам: слева Совет, справа Союз
  const byFaction = FACTIONS.map(f => RACES.filter(r => r.factionId === f.id));
  for (let i = 0; i < 3; i++) {
    for (const list of byFaction) {
      const r = list[i];
      const dim = !!d.factionId && r.factionId !== d.factionId;
      left.appendChild(originButton(r, { selected: d.raceId === r.id, dim }, () => pickRace(r.id), 'race'));
    }
  }
  const press = findById(RACES, 'press');
  left.appendChild(originButton(press, { selected: d.raceId === 'press' }, () => pickRace('press'), 'race press'));

  const right = document.getElementById('createRight');
  right.className = 'panel createInfo';
  right.innerHTML = '';
  const race = findById(RACES, d.raceId);
  const faction = findById(FACTIONS, d.factionId) || (d.raceId === 'press' ? PRESS_NEUTRAL : null);
  if (!race && !faction) {
    right.innerHTML = '<p class="hint">Выберите фракцию или расу. Пресса нейтральна: с фракцией она становится её прессой.</p>';
    return;
  }
  const info = document.createElement('div');
  info.className = 'infoText';
  const add = (tag, text, cls) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    el.textContent = text;
    info.appendChild(el);
    return el;
  };
  if (race) {
    add('h3', race.name);
    add('p', race.id === 'press'
      ? (faction.id ? 'Пресса фракции «' + faction.name + '»' : 'Нейтральная пресса, без фракции')
      : faction.name, 'sub');
    const start = startZoneOf(race.id, d.factionId);
    add('p', 'Начинает игру: ' + start.name + ' (ур. ' + start.min + '–' + start.max + ')', 'start');
    add('p', race.note, 'note');
  } else {
    add('h3', faction.name);
    add('p', faction.alias, 'sub');
  }
  // куда может попасть: свои локации фракции и нейтральные (нейтральная Пресса — все)
  const own = ZONES.filter(z => z.factionId === faction.id).map(z => z.name);
  add('p', faction.id ? 'Локации: ' + own.join(', ') + ' и нейтральные' : 'Локации: все — обеих фракций и нейтральные', 'sub');
  add('p', faction.motto, 'motto');
  add('p', faction.description);
  right.appendChild(info);

  // классы фракции: доступные выбранной расе — цветные, остальные — чёрно-белые
  const list = factionClassList(d.factionId, d.raceId);
  const allowed = race ? raceClasses(race.id, d.factionId) : null;
  const row = document.createElement('div');
  row.className = 'classRow';
  for (const c of list) {
    const tile = document.createElement('span');
    tile.className = 'mini' + (allowed && !allowed[c.id] ? ' dim' : '');
    tile.title = c.name;
    tile.innerHTML = iconTile(c.icon, c.color);
    row.appendChild(tile);
  }
  right.appendChild(row);

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'btn green';
  next.textContent = 'Выбрать класс';
  next.disabled = !race;
  next.addEventListener('click', () => { vibrate(); openClassStep(); });
  right.appendChild(next);
}
