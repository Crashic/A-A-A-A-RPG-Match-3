// Сколько записей истории от главного меню до текущего экрана (history.state.depth).
function navDepth() {
  return (history.state && history.state.depth) || 0;
}
