// Пока сюжет показывает, что нажать (подсказка видна): если в пузыре есть «Понятно» — только её; иначе только
// цель подсказки. Пузырь и окно диалога доступны всегда. Поле боя (перетаскивание) не блокируется — его ограничивает
// учебный бой. Шаги, где игрок свободен (тихие шаги — «иди качайся»), подсказку не показывают — и не блокируют.
function setupStoryBlock() {
  const allowed = t => {
    const box = document.getElementById('tutorial');
    if (box.hidden || !box.dataset.story) return true; // подсказки нет — всё можно
    if (t.closest('.tutBubble, #storyDialog, #confirm, #toast, #tip')) return true;
    // есть «Понятно» — нажать можно только её (и «Пропустить обучение»), даже на цель подсказки нельзя
    if (!box.querySelector('.tutOk').hidden) return false;
    const el = storyGuide.el;
    if (el && el.isConnected && el.contains(t)) return true;
    // экран перерисовался и цель — уже новый элемент: узнаём её по тому же селектору (storyGuideSel)
    if (el && !el.isConnected && storyGuide.sel) { const hit = t.closest(storyGuide.sel); if (hit) { storyGuide.el = hit; return true; } }
    return !!t.closest('#board'); // поле боя (учебный бой ограничивает ходы сам)
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
