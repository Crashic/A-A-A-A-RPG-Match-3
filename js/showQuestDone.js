// Окно «Задание сдано!» (макет «Подсказки по заданиям», п. 7): название, награда плашками (опыт, изолента, вещь),
// штамп «Оплачено». По «Отлично» — окно нового уровня, если он был (then).
function showQuestDone(q, item, then) {
  const box = document.getElementById('questDone');
  box.querySelector('.qdTitle').textContent = '«' + q.title + '»' + (q.giverName ? ' — ' + q.giverName + tr("ui. доволен") : '');
  const rew = box.querySelector('.qdRew');
  rew.innerHTML = '';
  const add = (html, cls) => { const s = document.createElement('span'); s.className = 'qdChip ' + (cls || ''); s.innerHTML = html; rew.appendChild(s); };
  if (q.reward.xp) add('+' + q.reward.xp + ' ' + tr("ui.опыта"), 'xp');
  if (q.reward.tape) add(formatTape(q.reward.tape));
  if (item) { const s = document.createElement('span'); s.className = 'qdChip r-' + item.rarity; s.textContent = item.name; rew.appendChild(s); }
  const ok = box.querySelector('.qdOk');
  ok.onclick = e => { e.stopPropagation(); vibrate(); box.classList.remove('open'); if (then) then(); };
  box.classList.add('open');
}
