// «Создать»: сохраняет персонажа, делает его текущим и показывает заставку, после неё — игра.
function finishCharacterCreation() {
  const d = creation.draft;
  const hero = {
    name: d.name.trim(),
    serverId: d.serverId,
    modeId: d.modeId,
    classId: d.classId,
    genderId: d.genderId,
    raceId: d.raceId,
    factionId: d.factionId,
    tutorial: tutorialState(null), // обучение: выключено ли при создании
    packs: { nests: 0, worn: [] }, // ни гнёзд, ни сумок: всё «в руках» (HANDS_SIZE), до акта «Тара»
    story: { act: 1, stage: 'intro', done: 0, v: STORY_VERSION }
  };
  createSlot(creation.slot, hero);
  setActiveSlot(creation.slot);
  creation = null;
  // экран создания заменяется заставкой: «Назад» с неё ведёт туда, откуда начали создание
  history.replaceState({ screen: 'intro', depth: navDepth() }, '');
  showScreen('intro', false);
  playIntro(hero, () => goHomeBase()); // после заставки — сюжет (разговор с NPC)
}
