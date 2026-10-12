// Карточка задания: название, кто дал, текст, цель (у взятого — полоса прогресса), награда и кнопки.
// mode — 'board' (кнопка «Взять») или 'active' («Сдать», когда выполнено, и «Отказаться»); index — номер в списке.
function questCard(q, mode, index) {
  const giver = findById(QUEST_GIVERS, q.giver) || { name: '', who: '' };
  const c = document.createElement('div');
  c.className = 'questCard' + (mode === 'active' && q.have >= q.need ? ' ready' : '');
  c.innerHTML = '<div class="qHead"><b></b><span class="qGiver"></span></div><p class="qText"></p>' +
    '<div class="qGoal"><span></span></div><div class="qFoot"><span class="qReward"></span></div>';
  c.querySelector('b').textContent = q.title;
  c.querySelector('.qGiver').textContent = giver.name + ', ' + giver.who;
  c.querySelector('.qText').textContent = q.text;
  const goal = c.querySelector('.qGoal');
  goal.firstChild.textContent = q.goal + ': ' + (mode === 'active' ? q.have + ' / ' : '') + q.need;
  if (q.gem) goal.insertAdjacentHTML('afterbegin', gemMiniIcon(q.gem));
  if (mode === 'active') {
    const bar = document.createElement('div');
    bar.className = 'bar xp qBar';
    bar.innerHTML = '<i></i>';
    bar.firstChild.style.width = Math.round(100 * q.have / q.need) + '%';
    goal.appendChild(bar);
  }
  const reward = c.querySelector('.qReward');
  reward.innerHTML = (q.reward.xp ? '<span class="qXp">+' + q.reward.xp + ' опыта</span>' : '') + formatTape(q.reward.tape);
  if (q.reward.item) {
    const rar = findById(ITEM_RARITIES, q.reward.item);
    const s = document.createElement('span');
    s.className = 'qItem';
    s.style.color = rar.color;
    s.textContent = '+ ' + rar.name.toLowerCase().replace(/(ий|ый)$/, 'ая') + ' вещь';
    reward.appendChild(s);
  }
  const foot = c.querySelector('.qFoot');
  const btn = (label, cls, fn) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn ' + cls + ' qBtn';
    b.textContent = label;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
    foot.appendChild(b);
  };
  if (mode === 'board') btn('Взять', 'green', () => acceptQuest(index));
  else {
    btn('Отказаться', 'stone', () => abandonQuest(index));
    if (q.have >= q.need) btn('Сдать', 'orange', () => turnInQuest(index));
  }
  return c;
}
