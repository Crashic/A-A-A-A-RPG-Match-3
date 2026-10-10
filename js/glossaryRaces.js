// Глоссарий · Расы (js/races.js): фракция, где начинают, доступные классы и их бонусы.
function glossaryRaces() {
  return RACES.map(r => {
    const f = findById(FACTIONS, r.factionId);
    const classes = Object.entries(r.classes).map(([id, b]) => findById(CLASSES, id).name + ' (' + b.text + ')');
    const start = r.id === 'press' ? 'по фракции класса' : startZoneOf(r.id).name;
    return glossaryEntry(iconTile(r.icon, r.color), r.name, f.name, [
      ['lore', r.note],
      'Начинает игру: ' + start,
      ['list', 'Классы: ' + classes.join(', ')]]);
  });
}
