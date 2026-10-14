// Журнал заданий (экран «Задания», как в WoW): слева — взятые задания по категориям (QUEST_CATEGORIES;
// заголовок категории сворачивает её — journalCollapsed; значок «!», если в категории есть готовое к сдаче;
// закрытые после отказа слоты — с таймером), справа — выбранное задание (questCard: «Сдать» — только когда
// выполнено, «Отказаться» — с предупреждением).
let journalSel = null;
const journalCollapsed = {};
function renderJournal() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('journalLeft');
  const right = document.getElementById('journalRight');
  if (!hero) { left.innerHTML = tr("ui.<p class=\"hint\">Нет персонажа</p>"); right.innerHTML = ''; return; }
  const active = (hero.quests && hero.quests.active) || [];
  if (!active.some(x => x.uid === journalSel)) journalSel = active.length ? active[0].uid : null;
  left.innerHTML = tr("ui.<p class=\"invTitle\">Задания</p>");
  for (const c of QUEST_CATEGORIES) {
    const list = active.map((x, i) => ({ x, i })).filter(o => o.x.cat === c.id);
    const locks = questLocks(hero, c.id);
    const ready = list.some(o => o.x.have >= o.x.need);
    const max = questLimit(hero, c.id);
    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'jCat' + (journalCollapsed[c.id] ? ' collapsed' : '');
    head.innerHTML = '<i class="jArrow"></i><span></span>' + (ready ? tr("ui.<b class=\"jReady\" data-tip=\"Есть задание, которое можно сдать\">!</b>") : '') + '<small></small>';
    head.querySelector('span').textContent = c.name;
    head.querySelector('small').textContent = max === Infinity ? list.length : questSlotsUsed(hero, c.id) + ' / ' + max;
    head.addEventListener('click', e => { e.stopPropagation(); vibrate(); journalCollapsed[c.id] = !journalCollapsed[c.id]; renderJournal(); });
    left.appendChild(head);
    if (journalCollapsed[c.id]) continue;
    for (const { x } of list) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'jQuest' + (x.uid === journalSel ? ' selected' : '') + (x.have >= x.need ? ' ready' : '');
      b.innerHTML = '<span></span><small></small>';
      b.firstChild.textContent = x.title;
      b.lastChild.textContent = x.have >= x.need ? tr("ui.готово") : x.have + ' / ' + x.need;
      b.dataset.uid = x.uid;
      b.addEventListener('click', e => { e.stopPropagation(); vibrate(); journalSel = x.uid; renderJournal(); storyEvent('journalSel', x.uid); });
      left.appendChild(b);
    }
    for (const l of locks) {
      const d = document.createElement('div');
      d.className = 'jQuest locked';
      d.innerHTML = tr("ui.<span>Слот закрыт</span><small class=\"qTimer\"></small>");
      d.lastChild.dataset.until = l.until;
      d.lastChild.textContent = '⏳ ' + timerText(l.until);
      d.dataset.tip = QUEST_ABANDON_TEXT;
      left.appendChild(d);
    }
    if (!list.length && !locks.length) {
      const p = document.createElement('p');
      p.className = 'jEmpty';
      p.textContent = c.board ? tr("ui.Пусто. Возьмите на доске в бункере.") : tr("ui.Пока нет.");
      left.appendChild(p);
    }
  }
  right.innerHTML = '';
  const i = active.findIndex(x => x.uid === journalSel);
  if (i < 0) { right.innerHTML = tr("ui.<p class=\"hint\">Заданий нет. Доска объявлений — в бункере.</p>"); return; }
  const cat = findById(QUEST_CATEGORIES, active[i].cat) || {};
  const title = document.createElement('p');
  title.className = 'invTitle';
  title.textContent = cat.name || '';
  right.append(title, questCard(active[i], 'active', i));
}
