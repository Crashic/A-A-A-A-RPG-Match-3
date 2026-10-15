// Карта врагов (макет «Карта врагов»): слева 9 локаций (название, «УР. a–b · фракция», «Старт», замок у чужих),
// справа шапка локации, описание на бумаге, враги (квадрат уровня, имя, навык, опыт) и зелёная «В бой».
// Касание по врагу выбирает его (кремовая строка), бой начинается кнопкой. Цвет уровней — сложность, как в WoW.
function renderMap() {
  const save = loadSlot(getActiveSlot());
  const level = save ? save.level : 1;
  const start = save ? startZoneOf(save.raceId, save.classId) : ZONES[0];
  if (!mapZoneId) {
    const last = save && zoneOfEnemy(save.lastEnemy);
    mapZoneId = (last && zoneAllowed(save, last) ? last : start).id;
  }
  const facName = z => { const f = findById(FACTIONS, z.factionId); return f ? f.name : tr("ui.Нейтральная"); };

  const zoneList = document.getElementById('zoneList');
  zoneList.innerHTML = '';
  let opened = 0;
  for (const zone of ZONES) {
    const open = zoneAllowed(save, zone);
    if (open) opened++;
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.zone = zone.id;
    b.className = 'zone' + (zone.id === mapZoneId ? ' selected' : '') + (open ? '' : ' locked');
    b.innerHTML = '<span class="zText"><b></b><small><i></i><span></span></small></span>';
    b.querySelector('b').textContent = zone.name;
    const range = zoneRange(zone); // уровни обычных врагов, без элиты
    const lv = b.querySelector('i');
    lv.textContent = tr("ui.ур. ") + range.min + '–' + range.max;
    lv.className = 'lvl-' + zoneColor(level, zone);
    b.querySelector('small span').textContent = ' · ' + facName(zone);
    if (zone.id === start.id) b.insertAdjacentHTML('beforeend', '<em class="zStart"></em>');
    if (b.querySelector('.zStart')) b.querySelector('.zStart').textContent = tr("ui.Старт");
    if (!open) b.insertAdjacentHTML('beforeend', '<svg class="zLock" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 10h12v12H6zM8.5 10V7a3.5 3.5 0 0 1 7 0v3h-2V7a1.5 1.5 0 0 0-3 0v3zM11 14h2v4h-2z" fill-rule="evenodd"/></svg>');
    b.addEventListener('click', () => { vibrate(); if (mapZoneId !== zone.id) mapEnemyId = null; mapZoneId = zone.id; storyOnZone(zone.id); renderMap(); tutorialCheck(); });
    zoneList.appendChild(b);
  }
  document.getElementById('zoneCount').textContent = opened + tr("ui. из ") + ZONES.length + tr("ui. открыто");

  const zone = findById(ZONES, mapZoneId);
  const open = zoneAllowed(save, zone);
  const range = zoneRange(zone);
  const info = document.getElementById('zoneInfo');
  info.innerHTML = '<div class="invTitle"><span></span><span></span></div><p class="zoneDesc paper"></p>';
  info.querySelector('.invTitle span').textContent = zone.name;
  info.querySelector('.invTitle span + span').textContent = tr("ui.ур. ") + range.min + '–' + range.max;
  const starters = zone.start.map(id => findById(RACES, id).name);
  info.querySelector('.invTitle').dataset.tip = facName(zone) +
    (starters.length ? tr("ui. · старт: ") + starters.join(', ') : '') + ' · ' + zone.field;
  info.lastChild.textContent = open ? zone.description
    : tr("ui.Закрыто: локация фракции «") + facName(zone) + tr("ui.». Сюда пускают только своих.");

  // выбранный враг: из этой локации — последний, с кем бились; иначе пока никто
  if (mapEnemyId && !zone.enemies.some(e => e.id === mapEnemyId)) mapEnemyId = null;
  if (!mapEnemyId && open && save && zone.enemies.some(e => e.id === save.lastEnemy)) mapEnemyId = save.lastEnemy;
  if (!open) mapEnemyId = null;

  const list = document.getElementById('enemyList');
  list.innerHTML = '';
  for (const e of zone.enemies) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.enemy = e.id;
    b.className = 'enemyCard' + (mapEnemyId === e.id ? ' selected' : '') + (open ? '' : ' locked') + (e.elite ? ' elite' : '');
    b.disabled = !open;
    b.innerHTML = '<span class="enemyLvl"></span><span class="enemyText"><b></b><small></small></span><span class="enemyXp"></span>';
    b.dataset.tipTitle = '«' + e.skill + '»';
    b.dataset.tip = e.short + ' ' + e.description;
    const lvl = b.querySelector('.enemyLvl');
    lvl.textContent = e.level;
    b.querySelector('b').textContent = e.name + (e.elite ? tr("ui. · Элита") : '');
    b.querySelector('small').textContent = tr("ui.Навык: ") + e.skill;
    const xp = mobXp(level, e.level, e.elite);
    const xpEl = b.querySelector('.enemyXp');
    xpEl.textContent = xp ? '+' + xp + tr("ui. опыта") : tr("ui.без опыта");
    xpEl.classList.add('lvl-' + difficultyOf(level, e.level));
    b.addEventListener('click', () => {
      vibrate();
      if (!storyAllowEnemy(e.id)) return; // сюжет: сначала — враг из задания
      mapEnemyId = e.id; renderMap(); tutorialCheck();
    });
    list.appendChild(b);
  }

  const fight = document.getElementById('mapFight');
  const chosen = mapEnemyId && zone.enemies.find(e => e.id === mapEnemyId);
  fight.disabled = !chosen;
  fight.textContent = chosen ? tr("ui.В бой: ") + chosen.name.split(/[\s‑-]/).pop() : tr("ui.Выберите врага");
  fight.onclick = () => { if (chosen) { vibrate(); chooseEnemy(chosen.id); } };
}
