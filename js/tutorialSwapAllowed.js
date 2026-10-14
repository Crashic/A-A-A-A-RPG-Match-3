// Учебный бой: можно ли игроку поменять фишки a и b. Пока идёт сценарий — только обмен из рамки;
// в фазе навыка поле закрыто. Разрешённый обмен двигает сценарий на следующую фазу.
function tutorialSwapAllowed(a, b) {
  if (!tutorialActive()) return true;
  const t = battle.tutorial;
  if (t.lockBoard) { showToast(tr("ui.Не спеши. Сначала — то, на что показывают.")); return false; }
  const e = t.expect;
  const same = (p, q) => p[0] === q[0] && p[1] === q[1];
  if (!e || !((same(a, e[0]) && same(b, e[1])) || (same(a, e[1]) && same(b, e[0])))) {
    showToast(tr("ui.Не туда, товарищ. Меняй фишки в рамке."));
    return false;
  }
  t.expect = null;
  t.phase++;
  hideTutorial();
  tutorialFrameHide();
  return true;
}
