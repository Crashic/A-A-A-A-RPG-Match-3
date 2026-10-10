// Точка входа: подключается последней в index.html.
function main() {
  settings = loadSettings();
  document.getElementById('gemClipShape').setAttribute('points', GEM_SQUIRCLE); // обрезка «Полос» по фишке
  showVersion();
  setupChangelog();
  setupGlossary();
  setupMenu();
  setupBoardInput();
  renderMenu();
  enterFullscreen();
  registerServiceWorker();
}

main();
