// Возврат в главное меню (кнопка «‹» на экранах и «Назад» телефона).
function goBack() {
  if (history.state && history.state.screen) history.back();
  else { renderMenu(); showScreen('menu', false); }
}
