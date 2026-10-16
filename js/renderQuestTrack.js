// Трекер заданий в бою (макет «Подсказки по заданиям», п. 4): справа над кнопкой меню боя, как лог боя —
// стрелка открывает/скрывает список (settings.questTrackOpen). До 3 заданий: точка категории, название, прогресс.
function renderQuestTrack() {
  const box = document.getElementById('questTrack');
  if (!box) return;
  const list = questTrackList();
  const open = !!settings.questTrackOpen;
  box.hidden = !list.length;
  box.classList.toggle('open', open);
  box.innerHTML = '<button type="button" class="qtToggle"></button><div class="qtPaper"><p class="qtHead"></p></div>';
  const tg = box.querySelector('.qtToggle');
  tg.setAttribute('aria-label', open ? tr("ui.Скрыть задания") : tr("ui.Показать задания"));
  tg.innerHTML = open ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg>' + JOURNAL_ICON;
  tg.onclick = e => { e.stopPropagation(); vibrate(); settings.questTrackOpen = !open; saveSettings(); renderQuestTrack(); };
  const paper = box.querySelector('.qtPaper');
  paper.querySelector('.qtHead').textContent = tr("ui.Задания в этом бою");
  for (const q of list.slice(0, 3)) {
    const row = document.createElement('div');
    row.className = 'qtLine c-' + q.cat + (q.have >= q.need ? ' done' : '');
    row.innerHTML = '<i></i><span></span><b></b>';
    row.querySelector('span').textContent = q.title;
    row.querySelector('b').textContent = q.have >= q.need ? '✓' : q.have + '/' + q.need;
    paper.appendChild(row);
  }
}
