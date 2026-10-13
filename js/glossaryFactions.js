// Глоссарий · Фракции (js/factions.js): девиз, описание, расы и локации фракции.
function glossaryFactions() {
  return FACTIONS.map(f => {
    const races = RACES.filter(r => r.factionId === f.id).map(r => r.name);
    const zones = ZONES.filter(z => z.factionId === f.id).map(z => z.name + ' (' + z.min + '–' + z.max + ')');
    return glossaryEntry(iconTile(f.icon, f.color), f.name, f.alias, [
      ['lore', f.motto], f.description,
      ['list', tr("ui.Расы: ") + races.join(', ')],
      ['list', tr("ui.Локации: ") + (zones.length ? zones.join(', ') : tr("ui.фракции своего класса")) + tr("ui. и общие")]]);
  });
}
