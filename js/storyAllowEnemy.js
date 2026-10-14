// Сюжет: можно ли идти на этого врага. Пока не пройден акт 1 — только на цель задания
// (нажатие на неё переводит сюжет к учебному бою).
function storyAllowEnemy(id) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  const st = storyState(hero);
  if (!hero || st.act !== 1 || st.done >= 1 || st.stage === 'after') return true;
  const target = storyTarget(hero);
  if (!target || target.enemy.id === id) {
    if (st.stage !== 'battle') { st.stage = 'battle'; saveSlot(slot, hero); }
    hideTutorial();
    return true;
  }
  showToast(tr("ui.Сначала задание: ") + target.enemy.name + '.');
  return false;
}
