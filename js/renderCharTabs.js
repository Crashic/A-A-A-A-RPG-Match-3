// Вкладки под характеристиками: иконки класса, фракции и расы; по нажатию — описание и бонусы.
// Открытая вкладка — charTab ('class' | 'faction' | 'race').
function renderCharTabs(box, hero) {
  const cls = findById(CLASSES, hero.classId);
  const faction = findById(FACTIONS, hero.factionId);
  const race = findById(RACES, hero.raceId);
  const bonus = raceClasses(hero.raceId)[hero.classId];
  const tabs = [
    { id: 'class', item: cls, label: 'Класс' },
    { id: 'faction', item: faction, label: 'Фракция' },
    { id: 'race', item: race, label: 'Раса' }
  ].filter(t => t.item);
  box.innerHTML = '';
  const bar = document.createElement('div');
  bar.className = 'charTabBar';
  for (const t of tabs) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'charTab' + (t.id === charTab ? ' selected' : '');
    b.innerHTML = iconTile(t.item.icon, t.item.color) + '<span></span>';
    b.querySelector('span').textContent = t.label;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); charTab = t.id; renderCharTabs(box, hero); });
    bar.appendChild(b);
  }
  box.appendChild(bar);

  const page = document.createElement('div');
  page.className = 'charTabPage';
  const add = (text, cls2) => { if (!text) return; const p = document.createElement('p'); if (cls2) p.className = cls2; p.textContent = text; page.appendChild(p); };
  if (charTab === 'class' && cls) {
    add(cls.name, 'tabTitle');
    add(cls.description);
    add(bonus ? 'Бонус у расы «' + race.name + '»: ' + bonus.text : '');
    for (const s of heroSkills(hero)) add('«' + s.name + '» — ' + (s.type === 'active' ? 'активный, ' + skillCostText(s) : 'пассивный') + ': ' + s.text, 'tabSkill');
  } else if (charTab === 'faction' && faction) {
    add(faction.name + ' — ' + faction.alias, 'tabTitle');
    add(faction.motto, 'tabLore');
    add(faction.description);
    add(Object.keys(faction.bonuses || {}).length ? '' : 'Бонусов фракции пока нет — только доступ к её локациям и врагам.', 'tabNote');
  } else if (charTab === 'race' && race) {
    add(race.name, 'tabTitle');
    add(race.note, 'tabLore');
    add(bonus ? 'С классом «' + cls.name + '»: ' + bonus.text : '');
    add('Начинает игру: ' + startZoneOf(hero.raceId, hero.classId).name);
    add('Названия характеристик: ' + STATS.map(s => statName(hero.raceId, s.id).name).join(', ') + '.', 'tabNote');
  }
  box.appendChild(page);
}
