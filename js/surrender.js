// «Сдаться» (меню боя): только в свой ход и не во время анимации. С подтверждением; бой — поражение,
// весь опыт, изолента и фишки, набранные в этом бою, пропадают (finishBattle(false, true)).
function surrender() {
  if (!battle || battle.over) return;
  if (!isHeroTurn() || !match3 || match3.busy) { showToast(tr("ui.Сдаться можно только в свой ход"), 1500); return; }
  showConfirm(tr("ui.Сдаться? Опыт и изолента, набранные в этом бою, пропадут."), tr("ui.Сдаться"), () => {
    if (!battle || battle.over) return;
    battle.gained = { xp: 0, tape: 0, gems: {} };
    finishBattle(false, true);
  });
}
