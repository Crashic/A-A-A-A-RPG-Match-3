// Экран «Доска объявлений»: слева — объявления (взять), справа — взятые задания с прогрессом
// (сдать выполненные, отказаться). Карточки — questCard.
function renderQuests() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('questsLeft');
  const right = document.getElementById('questsRight');
  if (!hero) { left.innerHTML = '<p class="hint">Нет персонажа</p>'; right.innerHTML = ''; return; }
  const q = hero.quests || { board: [], active: [] };
  left.innerHTML = '<p class="invTitle">Доска объявлений</p>';
  q.board.forEach((x, i) => left.appendChild(questCard(x, 'board', i)));
  if (!q.board.length) left.insertAdjacentHTML('beforeend', '<p class="hint">Объявлений нет. Бумага кончилась.</p>');
  right.innerHTML = '<p class="invTitle">Мои задания: ' + q.active.length + ' / ' + QUEST_ACTIVE_MAX + '</p>';
  q.active.forEach((x, i) => right.appendChild(questCard(x, 'active', i)));
  if (!q.active.length) right.insertAdjacentHTML('beforeend', '<p class="hint">Пока ничего. Возьмите объявление слева — прогресс идёт в боях.</p>');
}
