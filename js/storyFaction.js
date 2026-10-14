// Ключ фракции для реплик сюжета: council / union / press.
function storyFaction(hero) {
  return STORY_NPCS[hero && hero.factionId] ? hero.factionId : 'council';
}
