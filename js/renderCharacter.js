// Экран «Персонаж»: слева кукла (renderDoll), справа характеристики с кнопками «−/+»,
// свободные очки, сброс (круглая стрелка) и что всё это даёт в бою. Менять можно только вне боя.
function renderCharacter() {
  const hero = loadSlot(getActiveSlot());
  const doll = document.getElementById('dollPanel');
  const panel = document.getElementById('statsPanel');
  if (!hero) { doll.innerHTML = ''; panel.innerHTML = '<p class="hint">Нет персонажа</p>'; return; }
  renderDoll(doll, hero);
  const inBattle = !!(battle && !battle.over);
  const free = statPointsFree(hero);
  const stats = heroStats(hero);
  const base = CLASS_STATS[hero.classId] || {};
  panel.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'statsHead';
  head.innerHTML = '<div><h3></h3><p></p></div><span class="freePts"></span>' +
    '<button id="btnResetStats" class="btn stone round resetStats" type="button" aria-label="Сбросить очки" title="Сбросить очки">' +
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M24 16 A8 8 0 1 1 16 8 L20 8" fill="none" stroke="var(--text-primary)" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M18 3 L23 8 L18 13" fill="none" stroke="var(--text-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
  head.querySelector('h3').textContent = hero.name;
  head.querySelector('p').textContent = 'Ур. ' + hero.level + ' · ' + describeCharacter(hero);
  head.querySelector('.freePts').textContent = 'Свободно очков: ' + free;
  const reset = head.querySelector('#btnResetStats');
  reset.disabled = inBattle || free === STAT_POINTS_PER_LEVEL * hero.level;
  reset.addEventListener('click', () => resetStats());
  panel.appendChild(head);

  const list = document.createElement('div');
  list.className = 'statRows';
  const pts = heroPoints(hero);
  for (const s of STATS) {
    const row = document.createElement('div');
    row.className = 'statRowBig';
    row.innerHTML = iconTile(s.icon, s.color) + '<span class="statLabel"></span>' +
      '<button class="btn stone round statBtn" type="button" aria-label="Убрать очко">−</button>' +
      '<b class="statVal"></b>' +
      '<button class="btn green round statBtn" type="button" aria-label="Добавить очко">+</button>';
    const label = row.querySelector('.statLabel');
    label.textContent = statName(hero.raceId, s.id).name;
    attachTip(label, statName(hero.raceId, s.id).name, statTipText(hero.raceId, s.id));
    row.querySelector('.statVal').textContent = stats[s.id] + (pts[s.id] ? '' : '');
    row.querySelector('.statVal').title = 'База класса ' + (base[s.id] || STAT_BASE) + ', ваших очков ' + pts[s.id];
    const [minus, plus] = row.querySelectorAll('.statBtn');
    minus.disabled = inBattle || pts[s.id] <= 0;
    plus.disabled = inBattle || free <= 0;
    minus.addEventListener('click', () => changeStat(s.id, -1));
    plus.addEventListener('click', () => changeStat(s.id, 1));
    list.appendChild(row);
  }
  panel.appendChild(list);

  // что это даёт в бою — как у героя в начале боя
  const f = createHeroFighter(hero);
  const sum = document.createElement('p');
  sum.className = 'statsSummary';
  sum.textContent = 'Здоровье ' + f.maxHp + ' · Атака ' + f.attack + ' · Крит ' + f.critPct.toFixed(1).replace('.', ',') +
    ' % · Мана до ' + f.manaMax + ' · Щит за Деталь ' + f.shieldPerGem;
  panel.appendChild(sum);
  if (inBattle) {
    const note = document.createElement('p');
    note.className = 'statsNote';
    note.textContent = 'Идёт бой: очки можно перераспределить после него.';
    panel.appendChild(note);
  }
}
