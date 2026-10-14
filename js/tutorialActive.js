// Идёт ли сейчас сценарий учебного боя (до фазы «дальше сам»).
function tutorialActive() {
  return !!(battle && battle.tutorial && !battle.tutorial.free && !battle.over);
}
