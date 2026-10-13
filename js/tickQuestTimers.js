// Раз в секунду обновляет таймеры заблокированных слотов заданий; когда время вышло — перерисовывает экран.
function tickQuestTimers() {
  setInterval(() => {
    const els = document.querySelectorAll('.screen.active .qTimer[data-until]');
    let expired = false;
    els.forEach(el => { if (+el.dataset.until <= Date.now()) expired = true; else el.textContent = '⏳ ' + timerText(+el.dataset.until); });
    if (!expired) return;
    if (document.getElementById('quests').classList.contains('active')) renderQuests();
    if (document.getElementById('journal').classList.contains('active')) renderJournal();
  }, 1000);
}
