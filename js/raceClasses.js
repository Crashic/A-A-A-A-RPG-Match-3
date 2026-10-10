// Классы, доступные расе raceId: { classId: bonus }.
function raceClasses(raceId) {
  const race = findById(RACES, raceId);
  return race ? race.classes : {};
}
