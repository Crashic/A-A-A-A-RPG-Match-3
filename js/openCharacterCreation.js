// Открывает создание персонажа в ячейке slot: сначала сервер и режим, потом происхождение (фракция и раса), потом класс.
// returnTo: 'game' — после «Создать» сразу в игру, 'characters' — назад к списку.
function openCharacterCreation(slot, returnTo) {
  creation = {
    draft: { serverId: SERVERS[0].id, modeId: null, factionId: null, raceId: null, classId: null, genderId: null, name: '' },
    step: 'server',
    slot,
    returnTo
  };
  renderCreateStep();
  showScreen('create');
}
