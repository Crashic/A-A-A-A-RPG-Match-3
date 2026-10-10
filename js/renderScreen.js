// Перерисовывает экран перед показом (при переходах и кнопке «Назад» телефона).
function renderScreen(id) {
  if (id === 'menu') renderMenu();
  else if (id === 'characters') renderCharacters();
  else if (id === 'settings') renderSettings();
  else if (id === 'game') renderGame();
  else if (id === 'create' && creation) renderCreateStep();
}
