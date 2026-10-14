// Подставляет в реплику сюжета {name}, {enemy}, {zone}, {loot}, {skill}, {skillText}, {gem}, {faction}, {enemy5}, {zone5}.
function storyFill(text, hero) {
  const target = storyTarget(hero);
  const skill = heroSkills(hero)[0] || {};
  const gem = Object.keys(skill.cost || {})[0];
  const faction = findById(FACTIONS, hero.factionId) || {};
  const map = {
    name: hero.name,
    enemy: target ? target.enemy.name : '',
    zone: target ? target.zone.name.replace(/^.*«|»$/g, '') : '',
    loot: STORY_ACT1.loot[storyFaction(hero)] || '',
    skill: skill.name || '',
    skillText: skill.text || '',
    gem: gem ? gemName(gem) : '',
    faction: faction.name || '',
    enemy5: (storyTarget5(hero) || { enemy: {} }).enemy.name || '',
    zone5: storyTarget5(hero) ? storyTarget5(hero).zone.name.replace(/^.*«|»$/g, '') : ''
  };
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in map ? map[k] : m));
}
