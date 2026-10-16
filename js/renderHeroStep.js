// Экран создания по макету «Создание персонажа · C «Анкета-плакат»» (один шаг вместо «Происхождения» и «Класса»):
// слева — расы по фракциям (Совет, Союз, Пресса; плитки по центру блока), пол и «Случайно»;
// по центру — агитплакат с силуэтом героя, плитками расы и класса и табличкой имени;
// справа — бумажная анкета: сетка классов фракции (недоступные расе — чёрно-белые), описание выбранного класса,
// навыки, «‹ Назад» и «Создать ›».
function renderHeroStep() {
  const d = creation.draft;
  const race = findById(RACES, d.raceId);
  const allowed = raceClasses(d.raceId);
  const list = race ? factionClassList(d.factionId) : [];
  if (race && !allowed[d.classId]) {
    const first = list.find(c => allowed[c.id]);
    d.classId = first ? first.id : null;
  }
  const cls = race ? findById(CLASSES, d.classId) : null;
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  // слева: происхождение
  const left = document.getElementById('createLeft');
  left.className = 'panel hsLeft';
  left.innerHTML = '';
  left.appendChild(el('p', 'hsLab', tr("ui.1 · Происхождение")));
  for (const f of FACTIONS) {
    const g = el('div', 'hsFaction f-' + f.id);
    g.appendChild(el('p', 'hsFacName', f.short || f.name));
    const row = el('div', 'hsRaces');
    for (const r of RACES.filter(x => x.factionId === f.id)) {
      const b = el('button', 'hsTile' + (d.raceId === r.id ? ' sel' : ''));
      b.type = 'button';
      b.dataset.tip = r.name;
      b.innerHTML = iconTile(r.icon, r.color);
      b.addEventListener('click', () => { vibrate(); pickRace(r.id); });
      row.appendChild(b);
    }
    g.appendChild(row);
    left.appendChild(g);
  }
  const gRow = el('div', 'hsGender');
  gRow.appendChild(el('p', 'hsLab', tr("ui.Пол")));
  for (const g of GENDERS) {
    const b = el('button', 'hsGen' + (d.genderId === g.id ? ' sel' : ''), g.id === 'male' ? '♂' : '♀');
    b.type = 'button';
    b.dataset.tip = g.name;
    b.addEventListener('click', () => { vibrate(); d.genderId = g.id; renderCreateStep(); });
    gRow.appendChild(b);
  }
  left.appendChild(gRow);
  const rnd = el('button', 'btn stone hsRandom', tr("ui.Случайно"));
  rnd.type = 'button';
  rnd.dataset.tip = tr("ui.Случайный персонаж");
  rnd.addEventListener('click', () => { vibrate(); randomCharacter(); });
  left.appendChild(rnd);

  // по центру: плакат
  const poster = document.getElementById('createPoster');
  poster.innerHTML = '<p class="hsSlogan"></p><div class="hsSil">' + HERO_SILHOUETTE + '</div><div class="hsBadges"></div>' +
    '<label class="hsName"></label><p class="hsWho"></p>';
  poster.querySelector('.hsSlogan').textContent = tr("ui.Вступай в ряды!");
  const badges = poster.querySelector('.hsBadges');
  if (race) badges.insertAdjacentHTML('beforeend', iconTile(race.icon, race.color));
  if (cls) badges.insertAdjacentHTML('beforeend', iconTile(cls.icon, cls.color));
  const input = el('input', 'hsInput');
  input.type = 'text';
  input.id = 'heroName';
  input.maxLength = NAME_MAX_LENGTH;
  input.placeholder = tr("ui.Имя выжившего");
  input.autocomplete = 'off';
  input.value = d.name;
  if (useGameKeyboard()) {
    input.readOnly = true;
    input.setAttribute('inputmode', 'none');
    input.addEventListener('click', () => { vibrate(); openKeyboard(); });
  }
  input.addEventListener('input', () => { d.name = input.value; updateCreateButton(); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
  poster.querySelector('.hsName').appendChild(input);
  const faction = findById(FACTIONS, d.factionId);
  poster.querySelector('.hsWho').textContent = race ? [race.name, cls && cls.name, faction && faction.short !== race.name && faction.short].filter(Boolean).join(' · ')
    : tr("ui.Выберите расу слева");

  // справа: анкета
  const right = document.getElementById('createRight');
  right.className = 'paper hsRight';
  right.innerHTML = '';
  right.appendChild(el('p', 'hsLab', tr("ui.2 · Класс")));
  const top = el('div', 'hsTop');
  const grid = el('div', 'hsClasses');
  for (const c of list) {
    const b = el('button', 'hsCls' + (c.id === d.classId ? ' sel' : '') + (allowed[c.id] ? '' : ' dim'));
    b.type = 'button';
    b.dataset.tip = c.name + (allowed[c.id] ? '' : ' — ' + tr("ui.Таких выживших не существует"));
    b.innerHTML = iconTile(c.icon, c.color) + '<span></span>';
    b.querySelector('span').textContent = c.name.replace(tr("ui.‑Репортёр"), '');
    b.addEventListener('click', () => { vibrate(); d.classId = c.id; renderCreateStep(); });
    grid.appendChild(b);
  }
  top.appendChild(grid);
  const about = el('div', 'hsAbout');
  if (cls) {
    const bonus = allowed[cls.id];
    about.appendChild(el('b', '', cls.name));
    const desc = el('p', 'hsDesc', cls.description);
    desc.dataset.tip = cls.description;
    about.appendChild(desc);
    if (bonus) {
      const start = startZoneOf(race.id, cls.id);
      about.appendChild(el('i', '', bonus.text + tr("ui. · старт: ") + start.name));
    }
  } else about.appendChild(el('p', 'hsDesc', race ? '' : tr("ui.Сначала выберите расу — от неё зависят классы.")));
  top.appendChild(about);
  right.appendChild(top);
  const skills = cls && allowed[cls.id] ? heroSkills({ raceId: race.id, classId: cls.id }) : [];
  if (skills.length) {
    right.appendChild(el('p', 'hsLab', tr("ui.Навыки")));
    const box = el('div', 'hsSkills');
    for (const sk of skills) {
      const row = el('div', 'hsSkill');
      row.dataset.tipTitle = sk.name;
      row.dataset.tip = sk.text + (sk.lore ? '\n' + sk.lore : '');
      row.innerHTML = (sk.classSkill ? gemMiniIcon(Object.keys(sk.cost)[0]) : '') + '<b></b><span></span>';
      row.querySelector('b').textContent = sk.name;
      row.querySelector('span').textContent = (sk.type === 'active' ? skillCostText(sk) : tr("ui.пассивный")) + ' · ' + sk.text;
      box.appendChild(row);
    }
    right.appendChild(box);
  }
  const foot = el('div', 'hsFoot');
  const back = el('button', 'btn red hsBack', tr("ui.‹ Назад"));
  back.type = 'button';
  back.addEventListener('click', () => { vibrate(); createStepBack(); });
  const why = el('p', 'createWhy');
  why.id = 'createWhy';
  const create = el('button', 'btn green hsCreate', tr("ui.Создать ›"));
  create.type = 'button';
  create.id = 'createHero';
  create.addEventListener('click', () => {
    if (!canCreateHero(d).ok) return;
    vibrate();
    finishCharacterCreation();
  });
  foot.append(back, why, create);
  right.appendChild(foot);
  updateCreateButton();
}
