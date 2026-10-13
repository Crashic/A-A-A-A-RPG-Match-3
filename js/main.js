// Точка входа: подключается последней в index.html.
function main() {
  settings = loadSettings();
  document.getElementById('gemClipShape').setAttribute('points', GEM_SQUIRCLE); // обрезка «Полос» по фишке
  showVersion();
  setupChangelog();
  setupGlossary();
  setupCampButtons();
  document.querySelectorAll('.campIco').forEach(e => { e.outerHTML = CAMP_ICON; });
  setupCharacter();
  setupTips();
  setupCheat();
  setupScrollers();
  setupMenu();
  setupBoardInput();
  renderMenu();
  enterFullscreen();
  registerServiceWorker();
}

main();
