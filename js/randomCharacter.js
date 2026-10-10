// «Случайно»: случайные раса (с её фракцией), доступный класс, пол и имя — и сразу создаёт персонажа.
function randomCharacter() {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const race = pick(RACES);
  Object.assign(creation.draft, {
    raceId: race.id,
    factionId: race.factionId,
    classId: pick(Object.keys(race.classes)),
    genderId: pick(GENDERS).id,
    name: randomName()
  });
  finishCharacterCreation();
}
