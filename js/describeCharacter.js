// Короткое описание персонажа: «Человек · Мечник · Светлые».
function describeCharacter(hero) {
  const race = findById(RACES, hero.raceId);
  const cls = findById(CLASSES, hero.classId);
  const faction = findById(FACTIONS, hero.factionId);
  return [race, cls, faction].filter(Boolean).map(x => x.name).join(' · ');
}
