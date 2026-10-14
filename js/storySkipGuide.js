// «Пропустить обучение» в подсказке сюжета: с подтверждением выключить стрелки для героя (вернуть — в Настройках).
function storySkipGuide() {
  showConfirm(tr("ui.Пропустить обучение? Стрелок больше не будет — читай задания в журнале и жми куда надо сам. Вернуть — в Настройках."),
    tr("ui.Пропустить"), () => {
      const slot = getActiveSlot();
      const hero = loadSlot(slot);
      if (!hero) return;
      const st = storyState(hero);
      st.noGuide = true;
      if (st.junk && st.junk !== 'done') st.junk = 'done';
      saveSlot(slot, hero);
      if (battle && battle.tutorial) battle.tutorial = null; // учебный бой становится обычным
      const ok = storyGuide.onOk;
      hideTutorial();
      if (ok) ok(); else storyCheck();
    }, 'orange');
}
