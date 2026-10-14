// Мана боевого навыка класса — её фишки собираются в учебном бою (gem: 'mana' в TUTORIAL_PHASES).
function tutorialManaGem() {
  const skill = battle && heroSkills(battle.save)[0];
  return (skill && Object.keys(skill.cost || {})[0]) || 'sapphire';
}
