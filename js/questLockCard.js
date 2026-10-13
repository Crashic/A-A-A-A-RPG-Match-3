// Карточка заблокированного слота (после отказа): шутка и таймер до разблокировки (обновляется tickQuestTimers).
function questLockCard(lock) {
  const c = document.createElement('div');
  c.className = 'questCard locked';
  c.innerHTML = '<div class="qHead"><b>Слот закрыт</b><span class="qTimer"></span></div><p class="qText"></p>';
  c.querySelector('.qText').textContent = QUEST_ABANDON_TEXT;
  const t = c.querySelector('.qTimer');
  t.dataset.until = lock.until;
  t.textContent = '⏳ ' + timerText(lock.until);
  return c;
}
