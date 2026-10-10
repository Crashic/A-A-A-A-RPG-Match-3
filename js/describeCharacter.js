// Короткое описание персонажа: «Человек · Мечник · Светлые».
// withGender — добавить пол в начало: «Женский · Человек · Мечник · Светлые».
function describeCharacter(hero, withGender = false) {
  const parts = [
    withGender ? findById(GENDERS, hero.genderId) : null,
    findById(RACES, hero.raceId),
    findById(CLASSES, hero.classId),
    findById(FACTIONS, hero.factionId)
  ];
  return parts.filter(Boolean).map(x => x.name).join(' · ');
}
