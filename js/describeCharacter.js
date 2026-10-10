// Короткое описание персонажа: «Человек · Мечник · Светлые».
// withGender — добавить пол в начало: «Женский · Человек · Мечник · Светлые».
function describeCharacter(hero, withGender = false) {
  const parts = [
    withGender ? findById(GENDERS, hero.genderId) : null,
    findById(RACES, hero.raceId),
    findById(CLASSES, hero.classId),
    findById(FACTIONS, hero.factionId)
  ];
  const names = parts.filter(Boolean).map(x => x.name);
  return names.filter((n, i) => names.indexOf(n) === i).join(' · '); // «Пресса» — и раса, и фракция
}
