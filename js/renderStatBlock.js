// Блок характеристик на экране «Персонаж»: вкладки «Характеристики» и «Подробно» (renderStatDetails —
// здоровье, атака, крит, мана, щит). На первой: свободные очки, сброс (круглая стрелка), пять строк
// с названием расы (подсказка), значением и кнопками «−/+», итог в бою. Сброс — оранжевый, если есть
// розданные очки, и спрашивает подтверждение. В бою — только просмотр:
// кнопок «−/+» и сброса нет.
function renderStatBlock(box, hero, readOnly) {
  const free = statPointsFree(hero);
  const stats = heroStats(hero);
  const pts = heroPoints(hero);
  const base = CLASS_STATS[hero.classId] || {};
  box.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'statsHead';
  // вкладки: «Характеристики» (очки) и «Подробно» (что они дают в бою)
  for (const [id, label] of [['base', tr("ui.Характеристики")], ['detail', tr("ui.Подробно")]]) {
    const t = document.createElement('button');
    t.type = 'button';
    t.className = 'statTab' + (statTab === id ? ' selected' : '');
    t.textContent = label;
    t.addEventListener('click', e => { e.stopPropagation(); vibrate(); statTab = id; renderStatBlock(box, hero, readOnly); });
    head.appendChild(t);
  }
  box.appendChild(head);
  if (statTab === 'detail') { renderStatDetails(box, hero); return; }

  const pointsRow = document.createElement('div');
  pointsRow.className = 'statsPoints';
  pointsRow.innerHTML = '<span class="freePts"></span>';
  pointsRow.querySelector('.freePts').textContent = statPointsTotal(hero)
    ? tr("ui.Свободно очков: ") + free + ' / ' + statPointsTotal(hero) : tr("ui.Очки — со 2-го уровня");
  if (!readOnly) {
    const reset = document.createElement('button');
    reset.type = 'button';
    const spent = free < statPointsTotal(hero);
    reset.className = 'btn round resetStats ' + (spent ? 'orange' : 'stone'); // есть что сбросить — оранжевая
    reset.setAttribute('aria-label', tr("ui.Сбросить очки"));
    reset.dataset.tip = tr("ui.Сбросить розданные очки");
    reset.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M24 16 A8 8 0 1 1 16 8 L20 8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M18 3 L23 8 L18 13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    reset.disabled = !spent;
    reset.addEventListener('click', e => { e.stopPropagation(); showConfirm(tr("ui.Сбросить все розданные очки характеристик?"), tr("ui.Подтвердить"), () => resetStats(), 'orange'); });
    pointsRow.appendChild(reset);
  }
  box.appendChild(pointsRow);

  for (const s of STATS) {
    const row = document.createElement('div');
    row.className = 'statRowBig';
    row.innerHTML = iconTile(s.icon, s.color) + '<span class="statLabel"></span>' +
      (readOnly ? '' : tr("ui.<button class=\"btn stone round statBtn\" type=\"button\" aria-label=\"Убрать очко\">−</button>")) +
      '<b class="statVal"></b>' +
      (readOnly ? '' : tr("ui.<button class=\"btn green round statBtn\" type=\"button\" aria-label=\"Добавить очко\">+</button>"));
    const label = row.querySelector('.statLabel');
    label.textContent = statName(hero.raceId, s.id).name;
    attachTip(label, statName(hero.raceId, s.id).name, statTipText(hero.raceId, s.id));
    const val = row.querySelector('.statVal');
    val.textContent = stats[s.id];
    val.dataset.tip = tr("ui.База класса ") + (base[s.id] || STAT_BASE) + tr("ui., ваших очков ") + pts[s.id];
    if (!readOnly) {
      const [minus, plus] = row.querySelectorAll('.statBtn');
      minus.disabled = pts[s.id] <= 0;
      plus.disabled = free <= 0;
      holdStatButton(minus, s.id, -1); // удержание — по очку каждые 0,3 с, Shift — по 10
      holdStatButton(plus, s.id, 1);
    }
    box.appendChild(row);
  }

  if (readOnly) {
    const note = document.createElement('p');
    note.className = 'statsNote';
    note.textContent = tr("ui.Идёт бой: только просмотр. Очки можно раздать после боя.");
    box.appendChild(note);
  }
}
