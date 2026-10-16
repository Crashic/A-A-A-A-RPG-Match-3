// Учебный бой: можно ли игроку поменять фишки a и b. Пока идёт сценарий — только обмен из рамки;
// в фазе навыка поле закрыто. Засчитывается и любой обмен в рамке, собирающий ряд фишки фазы. Разрешённый обмен двигает сценарий на следующую фазу.
function tutorialSwapAllowed(a, b) {
  if (!tutorialActive()) return true;
  const t = battle.tutorial;
  if (t.lockBoard) { showToast(tr("ui.Не спеши. Сначала — то, на что показывают.")); return false; }
  const e = t.expect;
  const same = (p, q) => p[0] === q[0] && p[1] === q[1];
  const fits = sw => (same(a, sw[0]) && same(b, sw[1])) || (same(a, sw[1]) && same(b, sw[0]));
  // любой обмен внутри рамки, который собирает ряд фишки фазы, тоже засчитывается (не только заготовленный)
  const inFrame = (ph, p) => ph && ph.frame && p[0] >= ph.frame[0] && p[0] <= ph.frame[2] && p[1] >= ph.frame[1] && p[1] <= ph.frame[3];
  const makesRow = () => {
    const ph = tutorialPhase();
    if (!e || !inFrame(ph, a) || !inFrame(ph, b) || !ph.gem) return false;
    const type = GEM_TYPES.findIndex(g => g.id === (ph.gem === 'mana' ? tutorialManaGem() : ph.gem));
    const g = match3.grid.map(row => row.slice());
    swapInGrid(g, a, b);
    return findMatches(g).some(([r, c]) => g[r][c] === type);
  };
  if (!e || !(e.some(fits) || makesRow())) {
    showToast(tr("ui.Не туда, товарищ. Меняй фишки в рамке."));
    return false;
  }
  t.expect = null;
  t.phase++;
  hideTutorial();
  tutorialFrameHide();
  return true;
}
