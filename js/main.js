// Точка входа: подключается последней в index.html.
function main() {
  settings = loadSettings();
  showVersion();
  setupChangelog();
  setupMenu();
  renderMenu();
  enterFullscreen();
  registerServiceWorker();
}

main();
