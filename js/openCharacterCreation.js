// Открывает создание персонажа в ячейке slot: сначала происхождение (фракция и раса), потом класс.
// returnTo: 'game' — после «Создать» сразу в игру, 'characters' — назад к списку.
function openCharacterCreation(slot, returnTo) {
  creation = {
    draft: { factionId: null, raceId: null, classId: null, genderId: null, name: '' },
    step: 'origin',
    slot,
    returnTo
  };
  renderCreateStep();
  showScreen('create');
}
