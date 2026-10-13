// «Случайно»: случайные раса (с её фракцией), доступный класс, пол и имя — и сразу создаёт персонажа.
function randomCharacter() {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const race = pick(RACES);
  if (!creation.draft.modeId) creation.draft.modeId = pick(GAME_MODES).id;
  Object.assign(creation.draft, {
    raceId: race.id,
    factionId: race.factionId,
    classId: pick(Object.keys(race.classes)),
    genderId: pick(GENDERS).id,
    name: randomName()
  });
  finishCharacterCreation();
}
