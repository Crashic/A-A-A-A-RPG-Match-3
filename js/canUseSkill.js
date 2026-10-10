// Можно ли применить активный навык сейчас: ход игрока, поле свободно, хватает маны, «раз за бой» не потрачен.
function canUseSkill(skill) {
  if (!battle || !isHeroTurn() || !match3 || match3.busy) return false;
  if (skill.once && battle.skill.used[skill.id]) return false;
  for (const [gem, n] of Object.entries(skill.cost || {})) if (battle.hero.mana[gem] < n) return false;
  return true;
}
