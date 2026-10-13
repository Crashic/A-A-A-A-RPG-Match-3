// «Скрыть обучение»: выключить для текущего персонажа (или создаваемого) и сказать, где включить обратно.
function tutorialOff() {
  const onCreate = document.getElementById('create').classList.contains('active');
  if (onCreate && creation) tutorialState(null).off = true;
  else {
    const slot = getActiveSlot();
    const hero = loadSlot(slot);
    if (hero) { tutorialState(hero).off = true; saveSlot(slot, hero); if (battle && battle.slot === slot) battle.save.tutorial = hero.tutorial; }
  }
  hideTutorial();
  vibrate();
  showToast(tr("ui.Обучение скрыто. Включить снова — в Настройках."), 3000);
}
