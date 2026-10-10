// Классы фракции: все классы её рас (у Прессы — её семь). Порядок — как в CLASSES.
function factionClassList(factionId) {
  const ids = new Set();
  for (const race of RACES)
    if (race.factionId === factionId) Object.keys(race.classes).forEach(id => ids.add(id));
  return CLASSES.filter(c => ids.has(c.id));
}
