// Кнопки «Лагерь» в главном меню и меню боя: видны, только когда лагерь открыт (campUnlocked).
// В столбце меню экранов пункт показан всегда, но до открытия — недоступен (подсказка).
function setupCampButtons() {
  const open = campUnlocked();
  for (const id of ['btnCamp', 'btnCampGame']) {
    const b = document.getElementById(id);
    if (!b) continue;
    b.hidden = !open;
    if (!b.dataset.wired) { b.dataset.wired = '1'; b.addEventListener('click', () => { vibrate(); closeBattleMenu(); openCamp(); }); }
  }
}
