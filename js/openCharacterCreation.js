// Открывает создание персонажа в ячейке slot.
// returnTo: 'game' — после «Создать» сразу в игру, 'characters' — назад к списку.
function openCharacterCreation(slot, returnTo) {
  creation = { draft: {}, step: 0, slot, returnTo };
  renderCreateStep();
  showScreen('create');
}
