// Пока сюжет показывает, что нажать (подсказка видна), нажимать можно только туда: на цель подсказки,
// на сам пузырь («Понятно») и в окно диалога. Поле боя (перетаскивание) не блокируется — его ограничивает
// учебный бой. Шаги, где игрок свободен (тихие шаги — «иди качайся»), подсказку не показывают — и не блокируют.
function setupStoryBlock() {
  const allowed = t => {
    const box = document.getElementById('tutorial');
    if (box.hidden || !box.dataset.story) return true; // подсказки нет — всё можно
    const el = storyGuide.el;
    if (el && el.isConnected && el.contains(t)) return true;
    return !!t.closest('.tutBubble, #storyDialog, #board, #toast, #tip');
  };
  const block = e => {
    if (allowed(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    {
      const now = Date.now();
      if (now - (block.last || 0) > 1500) { block.last = now; showToast(tr("ui.Сначала — то, на что показывают.")); }
      const ring = document.querySelector('#tutorial .tutRing');
      if (ring) { ring.classList.remove('nudge'); void ring.offsetWidth; ring.classList.add('nudge'); }
    }
  };
  document.addEventListener('click', block, true);
}
