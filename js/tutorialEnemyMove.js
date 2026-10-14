// Учебный бой, ход врага: в фазе врага (p2) рассаживает его ряд, показывает пояснение с «Понятно»
// и возвращает заготовленный обмен { a, b }. В остальное время — null (обычный ход бота).
async function tutorialEnemyMove() {
  const ph = tutorialPhase();
  if (!ph || !ph.enemy) return null;
  if (!tutorialPlant(ph)) { battle.tutorial.phase++; return null; }
  await new Promise(done => storyGuide(document.getElementById('enemyPanel'), storyFill(ph.text, battle.save), done));
  battle.tutorial.phase++;
  return { a: ph.swap[0], b: ph.swap[1] };
}
