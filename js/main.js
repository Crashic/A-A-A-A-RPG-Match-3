// Точка входа: подключается последней в index.html.
function main() {
  settings = loadSettings();
  showVersion();
  setupChangelog();
  setupMenu();
  setupBoardInput();
  renderMenu();
  enterFullscreen();
  registerServiceWorker();
}

main();
