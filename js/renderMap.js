// Карта врагов: слева 9 локаций (чужие фракционные — закрыты, чёрно-белые; «Старт» — стартовая),
// справа описание выбранной локации и её враги (уровень, имя, навык, опыт; что делает навык — в подсказке и под панелью врага в бою). Цвет уровня — сложность для героя, как в WoW.
function renderMap() {
  const save = loadSlot(getActiveSlot());
  const level = save ? save.level : 1;
  const start = save ? startZoneOf(save.raceId, save.classId) : ZONES[0];
  if (!mapZoneId) {
    const last = save && zoneOfEnemy(save.lastEnemy);
    mapZoneId = (last && zoneAllowed(save, last) ? last : start).id;
  }
  const zoneList = document.getElementById('zoneList');
  zoneList.innerHTML = '';
  for (const zone of ZONES) {
    const open = zoneAllowed(save, zone);
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.zone = zone.id;
    b.className = 'zone' + (zone.id === mapZoneId ? ' selected' : '') + (open ? '' : ' locked');
    b.innerHTML = '<b></b><span></span>';
    b.firstChild.textContent = (zone.id === start.id ? '★ ' : '') + zone.name;
    const range = zoneRange(zone); // уровни обычных врагов, без элиты
    b.lastChild.textContent = range.min + '–' + range.max;
    b.lastChild.className = 'lvl-' + zoneColor(level, zone);
    b.addEventListener('click', () => { vibrate(); mapZoneId = zone.id; storyOnZone(zone.id); renderMap(); tutorialCheck(); });
    zoneList.appendChild(b);
  }

  const zone = findById(ZONES, mapZoneId);
  const open = zoneAllowed(save, zone);
  const faction = findById(FACTIONS, zone.factionId);
  const info = document.getElementById('zoneInfo');
  info.innerHTML = '<p class="zoneTags"></p><p class="zoneDesc"></p>';
  const starters = zone.start.map(id => findById(RACES, id).name);
  info.firstChild.textContent = (faction ? faction.name : tr("ui.Нейтральная — для всех")) +
    (starters.length ? tr("ui. · старт: ") + starters.join(', ') : '') + ' · ' + zone.field;
  info.lastChild.textContent = open ? zone.description
    : tr("ui.Закрыто: локация фракции «") + faction.name + tr("ui.». Сюда пускают только своих.");

  const list = document.getElementById('enemyList');
  list.innerHTML = '';
  for (const e of zone.enemies) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.enemy = e.id;
    b.className = 'enemyCard' + (save && save.lastEnemy === e.id ? ' current' : '') + (open ? '' : ' locked');
    b.disabled = !open;
    b.innerHTML = '<span class="enemyHead"><span class="enemyLvl"></span><b></b></span>' +
      '<span class="enemyAbout"></span><span class="enemyXp"></span>';
    b.dataset.tipTitle = '«' + e.skill + '»';
    b.dataset.tip = e.short + ' ' + e.description;
    b.querySelector('.enemyAbout').textContent = '«' + e.skill + '»';
    const lvl = b.querySelector('.enemyLvl');
    lvl.textContent = e.level;
    lvl.classList.add('lvl-' + difficultyOf(level, e.level));
    b.querySelector('b').textContent = e.name + (e.elite ? tr("ui. · Элита") : '');
    const xp = mobXp(level, e.level, e.elite);
    b.querySelector('.enemyXp').textContent = xp ? xp + tr("ui. опыта") : tr("ui.без опыта");
    b.addEventListener('click', () => { vibrate(); chooseEnemy(e.id); });
    list.appendChild(b);
  }
}
