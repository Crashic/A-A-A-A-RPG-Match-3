// Шаг назад по экранам (кнопки «‹», «Назад» телефона, Esc).
function goBack() {
  if (history.state && history.state.screen) history.back();
  else { renderMenu(); showScreen('menu', false); }
}
