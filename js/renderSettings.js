// Выставляет на экране настроек текущие значения.
function renderSettings() {
  for (const key of ['music', 'sound']) {
    document.getElementById('set-' + key).value = settings[key];
    document.getElementById('val-' + key).textContent = settings[key] + '%';
  }
  for (const key of ['vibration', 'fullscreen', 'notifications', 'tutorialAll']) {
    document.getElementById('set-' + key).checked = settings[key];
  }
  // обучение текущего персонажа: строка видна, если персонаж есть и обучение включено для всех
  const hero = loadSlot(getActiveSlot());
  document.getElementById('rowTutorialHero').hidden = !hero || !settings.tutorialAll;
  if (hero) document.getElementById('set-tutorialHero').checked = !tutorialState(hero).off;
}
