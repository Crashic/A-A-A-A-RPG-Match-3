// Глоссарий · Расы (js/races.js): фракция, где начинают, доступные классы и их бонусы.
function glossaryRaces() {
  return RACES.map(r => {
    const f = findById(FACTIONS, r.factionId);
    const classes = Object.entries(r.classes).map(([id, b]) => findById(CLASSES, id).name + ' (' + b.text + ')');
    const start = r.id === 'press' ? tr("ui.по фракции класса") : startZoneOf(r.id).name;
    return glossaryEntry(iconTile(r.icon, r.color), r.name, f.name, [
      ['lore', r.note],
      tr("ui.Начинает игру: ") + start,
      ['list', tr("ui.Классы: ") + classes.join(', ')]]);
  });
}
