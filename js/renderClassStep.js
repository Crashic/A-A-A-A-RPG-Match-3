// Экран «Класс»: слева иконки классов фракции (недоступные расе — чёрно-белые),
// справа описание выбранного класса с навыком и бонусом расы, имя, пол и «Создать персонажа».
function renderClassStep() {
  const d = creation.draft;
  const list = factionClassList(d.factionId);
  const allowed = raceClasses(d.raceId);
  const race = findById(RACES, d.raceId);

  const left = document.getElementById('createLeft');
  left.className = 'panel classGrid';
  left.innerHTML = '';
  const tile = c => originButton(c, { selected: d.classId === c.id, dim: !allowed[c.id] }, () => {
    d.classId = c.id;
    renderCreateStep();
  }, 'cls');
  // у Прессы — две колонки с названием фракции класса сверху, Хронист посередине внизу
  if (d.raceId === 'press') fillPressColumns(left, tile);
  else for (const c of list) left.appendChild(tile(c));

  const right = document.getElementById('createRight');
  right.className = 'panel createInfo';
  right.innerHTML = '';
  const cls = findById(CLASSES, d.classId);
  const info = document.createElement('div');
  info.className = 'infoText';
  if (cls) {
    const bonus = allowed[cls.id];
    info.innerHTML = '<h3></h3><p class="sub"></p><p></p><p class="skill"><b>Навык: </b><span></span></p>';
    info.querySelector('h3').textContent = cls.name;
    const side = bonus && race.id === 'press' ? findById(FACTIONS, bonus.side) : null;
    const start = startZoneOf(race.id, cls.id);
    info.querySelector('.sub').textContent = race.name + (race.id === 'press' ? (side ? ' · ' + side.name : ' · нейтральный') : '') +
      ': ' + (bonus ? bonus.text : 'класс недоступен') + (bonus ? ' · старт: ' + start.name : '');
    info.querySelectorAll('p')[1].textContent = cls.description;
    info.querySelector('.skill span').textContent = cls.skill + ' (в разработке)';
  }
  right.appendChild(info);

  // имя и пол
  const row = document.createElement('div');
  row.className = 'nameRow';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'heroName';
  input.className = 'textInput';
  input.maxLength = NAME_MAX_LENGTH;
  input.placeholder = 'Имя выжившего';
  input.autocomplete = 'off';
  input.value = d.name;
  if (useGameKeyboard()) {
    input.readOnly = true;
    input.setAttribute('inputmode', 'none');
    input.addEventListener('click', () => { vibrate(); openKeyboard(); });
  }
  input.addEventListener('input', () => { d.name = input.value; updateCreateButton(); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
  row.appendChild(input);
  for (const g of GENDERS) {
    const color = g.id === 'male' ? 'var(--gem-sapphire)' : 'var(--gem-ruby)';
    row.appendChild(originButton(Object.assign({ color }, g), { selected: d.genderId === g.id }, () => {
      d.genderId = g.id;
      renderCreateStep();
    }, 'gender'));
  }
  right.appendChild(row);

  const create = document.createElement('button');
  create.type = 'button';
  create.id = 'createHero';
  create.className = 'btn green';
  create.textContent = 'Создать персонажа';
  create.addEventListener('click', () => {
    if (!canCreateHero(d).ok) return;
    vibrate();
    finishCharacterCreation();
  });
  right.appendChild(create);
  const why = document.createElement('p');
  why.id = 'createWhy';
  why.className = 'createWhy';
  right.appendChild(why);
  updateCreateButton();
}
