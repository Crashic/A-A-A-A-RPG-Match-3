// «Случайно»: случайные раса, фракция (для Прессы — любая или нейтральная), доступный класс,
// пол и имя — и сразу создаёт персонажа.
function randomCharacter() {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const race = pick(RACES);
  const factionId = race.factionId || pick(['council', 'union', null]);
  const classId = pick(Object.keys(raceClasses(race.id, factionId)));
  Object.assign(creation.draft, {
    raceId: race.id, factionId, classId, genderId: pick(GENDERS).id, name: randomName()
  });
  finishCharacterCreation();
}
