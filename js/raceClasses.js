// Классы, доступные расе raceId во фракции factionId (null — нейтральная): { classId: bonus }.
function raceClasses(raceId, factionId) {
  const race = findById(RACES, raceId);
  if (!race) return {};
  if (race.classesByFaction) return race.classesByFaction[factionId || 'none'] || {};
  return race.classes;
}
