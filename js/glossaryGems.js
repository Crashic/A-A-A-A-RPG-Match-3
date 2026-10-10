// Глоссарий · Фишки: что даёт каждая фишка (js/gemTypes.js, GEM_EFFECTS в js/battleConfig.js).
function glossaryGems() {
  return GEM_TYPES.map(gem => glossaryEntry(gemMiniIcon(gem.id),
    gem.name + ' — ' + gem.resource, GEM_EFFECTS[gem.id].short, [GEM_EFFECTS[gem.id].text]));
}
