// Глоссарий · Локации и враги (js/zones.js): уровни, чья локация, кто начинает, фишки, враги с навыками.
function glossaryZones() {
  const out = [];
  for (const z of ZONES) {
    const f = findById(FACTIONS, z.factionId);
    const starters = z.start.map(id => findById(RACES, id).name);
    out.push(glossaryHeading(z.name + ' · ' + z.min + '–' + z.max));
    out.push(glossaryEntry('', f ? f.name : 'Общая — для всех', z.field, [
      z.description, starters.length ? ['list', 'Начинают здесь: ' + starters.join(', ')] : null]));
    for (const e of z.enemies) {
      out.push(glossaryEntry('<b class="gLvl">' + e.level + '</b>', e.name + (e.elite ? ' · Элита' : ''),
        e.skill ? 'Навык «' + e.skill + '»' : '', [e.short, ['lore', e.description]]));
    }
  }
  return out;
}
