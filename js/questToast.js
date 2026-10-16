// Подсказки по заданиям (макет «Подсказки по заданиям», п. 1, 2, 8): тост сверху по центру.
// kind: 'progress' — «Название · have / need +add» с полосой (2,5 с); 'done' — кремовый со штампом «ГОТОВО»,
// касание открывает журнал (4 с); 'burn' — «СГОРЕЛО» (ежедневные истекли, 4 с). q — { title, have, need }.
function questToast(kind, q, add) {
  let box = document.getElementById('questToast');
  if (!box) { box = document.createElement('div'); box.id = 'questToast'; document.body.appendChild(box); }
  clearTimeout(questToast.timer);
  box.className = 'qt-' + kind;
  box.innerHTML = '';
  if (kind === 'progress') {
    box.innerHTML = '<span class="qtIco">' + JOURNAL_ICON + '</span><span class="qtBody"><span class="qtRow"><b></b><em></em></span><span class="qtBar"><i></i></span></span>';
    box.querySelector('b').textContent = q.title;
    box.querySelector('em').innerHTML = q.have + ' / ' + q.need + (add ? ' <span>+' + add + '</span>' : '');
    box.querySelector('i').style.width = Math.round(q.have / q.need * 100) + '%';
  } else {
    box.innerHTML = '<span class="qtStamp"></span><span class="qtBody"><b></b><small></small></span>';
    box.querySelector('.qtStamp').textContent = kind === 'done' ? tr("ui.Готово") : tr("ui.Сгорело");
    box.querySelector('b').textContent = q.title;
    box.querySelector('small').textContent = kind === 'done' ? tr("ui.Задание выполнено — сдайте в журнале") : tr("ui.Ежедневные задания сгорели — новые в 6:00");
  }
  box.onclick = kind === 'done' ? () => { box.classList.remove('show'); if (!battle || battle.over) openJournal(); } : null;
  void box.offsetWidth;
  box.classList.add('show');
  questToast.timer = setTimeout(() => box.classList.remove('show'), kind === 'progress' ? 2500 : 4000);
}
