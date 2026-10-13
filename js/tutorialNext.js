// «Понятно»: шаг обучения просмотрен (больше не показывается этому персонажу) — дальше следующий.
function tutorialNext() {
  const id = document.getElementById('tutorial').dataset.step;
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (hero && id) {
    tutorialState(hero).seen[id] = true;
    saveSlot(slot, hero);
    if (battle && battle.slot === slot) battle.save.tutorial = hero.tutorial; // чтобы итог боя не затёр
  }
  vibrate();
  hideTutorial();
  tutorialCheck();
}
