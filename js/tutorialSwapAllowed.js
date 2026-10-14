// Учебный бой: можно ли игроку поменять фишки a и b. Пока идёт сценарий — только обмен из рамки;
// в фазе навыка поле закрыто. Разрешённый обмен двигает сценарий на следующую фазу.
function tutorialSwapAllowed(a, b) {
  if (!tutorialActive()) return true;
  const t = battle.tutorial;
  if (t.lockBoard) { showToast(tr("ui.Не спеши. Сначала — то, на что показывают.")); return false; }
  const e = t.expect;
  const same = (p, q) => p[0] === q[0] && p[1] === q[1];
  const fits = sw => (same(a, sw[0]) && same(b, sw[1])) || (same(a, sw[1]) && same(b, sw[0]));
  if (!e || !e.some(fits)) {
    showToast(tr("ui.Не туда, товарищ. Меняй фишки в рамке."));
    return false;
  }
  t.expect = null;
  t.phase++;
  hideTutorial();
  tutorialFrameHide();
  return true;
}
