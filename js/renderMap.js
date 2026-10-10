// Карта врагов: слева зоны с диапазоном уровней, справа враги выбранной зоны.
// Цвет уровня — сложность для героя, как в WoW (difficultyOf).
function renderMap() {
  const save = loadSlot(getActiveSlot());
  const level = save ? save.level : 1;
  if (!mapZoneId) {
    const home = ZONES.find(z => level >= z.min && level <= z.max) || ZONES[0];
    mapZoneId = home.id;
  }
  const zoneList = document.getElementById('zoneList');
  zoneList.innerHTML = '';
  for (const zone of ZONES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'zone' + (zone.id === mapZoneId ? ' selected' : '');
    b.innerHTML = '<b></b><span></span>';
    b.firstChild.textContent = zone.name;
    b.lastChild.textContent = zone.min + '–' + zone.max;
    b.lastChild.className = 'lvl-' + difficultyOf(level, Math.round((zone.min + zone.max) / 2));
    b.addEventListener('click', () => { vibrate(); mapZoneId = zone.id; renderMap(); });
    zoneList.appendChild(b);
  }
  const zone = ZONES.find(z => z.id === mapZoneId);
  const list = document.getElementById('enemyList');
  list.innerHTML = '';
  for (const e of zone.enemies) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'enemyCard' + (save && save.lastEnemy === e.id ? ' current' : '');
    b.innerHTML = '<span class="enemyLvl"></span><b></b><span class="enemyXp"></span>';
    const lvl = b.querySelector('.enemyLvl');
    lvl.textContent = e.level;
    lvl.classList.add('lvl-' + difficultyOf(level, e.level));
    b.querySelector('b').textContent = e.name + (e.elite ? ' · Элита' : '');
    const xp = mobXp(level, e.level, e.elite);
    b.querySelector('.enemyXp').textContent = xp ? xp + ' опыта' : 'без опыта';
    b.addEventListener('click', () => { vibrate(); chooseEnemy(e.id); });
    list.appendChild(b);
  }
}
