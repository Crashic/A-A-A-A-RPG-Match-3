// Точка входа: подключается последней в index.html.
function main() {
  settings = loadSettings();
  document.getElementById('gemClipShape').setAttribute('points', GEM_SQUIRCLE); // обрезка «Полос» по фишке
  applyLocale(); // язык интерфейса (settings.lang)
  setupLanguage();
  showVersion();
  setupChangelog();
  setupGlossary();
  setupCampButtons();
  tickQuestTimers();
  setupInstall(); // «Установить приложение» в настройках
  document.querySelectorAll('.campIco').forEach(e => { e.outerHTML = CAMP_ICON; });
  document.querySelectorAll('.journalIco').forEach(e => { e.outerHTML = JOURNAL_ICON; });
  setupCharacter();
  setupTips();
  setupCheat();
  setupScrollers();
  setupMenu();
  setupFeatureLocks(); // замки функций по сюжету
  setupStoryBlock(); // пока сюжет показывает, что нажать, — только туда
  setupBoardInput();
  renderMenu();
  updateNotifyBadges();
  enterFullscreen();
  registerServiceWorker();
}

main();
