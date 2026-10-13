// Экран «Доска объявлений»: слева — доска с вкладками «Поручения» / «Ежедневные» (взять), справа —
// взятые задания по категориям (QUEST_CATEGORIES: сюжетные, побочные, поручения, ежедневные) с прогрессом.
// Открытые вкладки — questBoardTab и questTab. Карточки — questCard.
let questBoardTab = 'errand';
let questTab = 'errand';
function renderQuests() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('questsLeft');
  const right = document.getElementById('questsRight');
  if (!hero) { left.innerHTML = '<p class="hint">Нет персонажа</p>'; right.innerHTML = ''; return; }
  if (questBoard(hero)) saveSlot(getActiveSlot(), hero); // мог наступить новый день
  const q = hero.quests;
  const tabs = (box, cats, current, label, pick) => {
    const bar = document.createElement('div');
    bar.className = 'qTabs';
    for (const c of cats) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'charTab' + (c.id === current ? ' selected' : '');
      b.textContent = label(c);
      b.addEventListener('click', e => { e.stopPropagation(); vibrate(); pick(c.id); renderQuests(); });
      bar.appendChild(b);
    }
    box.appendChild(bar);
  };
  const note = (box, text) => box.insertAdjacentHTML('beforeend', '<p class="hint"></p>') || (box.lastChild.textContent = text);

  left.innerHTML = '<p class="invTitle">Доска объявлений</p>';
  tabs(left, QUEST_CATEGORIES.filter(c => c.board), questBoardTab, c => c.short, id => { questBoardTab = id; });
  const list = questBoardTab === 'daily' ? 'daily' : 'board';
  q[list].forEach((x, i) => left.appendChild(questCard(x, list, i)));
  if (!q[list].length) note(left, questBoardTab === 'daily' ? 'На сегодня всё разобрали. Новые — завтра в 6:00.' : 'Объявлений нет. Бумага кончилась.');

  const count = c => questSlotsUsed(hero, c.id);
  const max = c => { const m = questLimit(hero, c.id); return m === Infinity ? '' : ' ' + count(c) + '/' + m; };
  right.innerHTML = '<p class="invTitle">Мои задания</p>';
  tabs(right, QUEST_CATEGORIES, questTab, c => c.tab + max(c), id => { questTab = id; });
  const cat = findById(QUEST_CATEGORIES, questTab);
  q.active.forEach((x, i) => { if (x.cat === questTab) right.appendChild(questCard(x, 'active', i)); });
  for (const l of questLocks(hero, questTab)) right.appendChild(questLockCard(l));
  if (!count(cat) && !questLocks(hero, questTab).length) note(right, cat.note);
}
