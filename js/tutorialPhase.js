// Текущая фаза учебного боя (TUTORIAL_PHASES) или null.
function tutorialPhase() {
  return tutorialActive() ? TUTORIAL_PHASES[battle.tutorial.phase] || null : null;
}
