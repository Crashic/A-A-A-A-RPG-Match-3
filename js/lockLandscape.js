// Закрепляет горизонтальную ориентацию. Браузер разрешает это только в полноэкранном режиме
// (установленное приложение и так горизонтальное — manifest); если нельзя — молча ничего не делает.
function lockLandscape() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {});
  }
}
