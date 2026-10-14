// Можно ли применить активный навык сейчас: ход игрока, поле свободно, хватает маны,
// «раз за бой» не потрачен, перезарядка прошла.
function canUseSkill(skill) {
  if (!battle || !isHeroTurn() || !match3 || match3.busy || battle.over) return false;
  if (tutorialActive()) { // учебный бой: навык — только в своей фазе и только боевой навык класса
    const ph = tutorialPhase();
    if (!ph || ph.id !== 'skill' || skill.id !== heroSkills(battle.save)[0].id) return false;
  }
  if (skill.once && battle.skill.used[skill.id]) return false;
  if ((battle.skill.cooldowns || {})[skill.id] > 0) return false;
  for (const [gem, n] of Object.entries(skill.cost || {})) if (battle.hero.mana[gem] < n) return false;
  return true;
}
