// В начале хода врага: если хватает маны и прошла перезарядка — применяет свой навык (ENEMY_SKILLS).
// Ход не тратится. Возвращает true, если навык применён.
async function enemyUseSkill() {
  const skill = ENEMY_SKILLS[battle.enemyId];
  const sk = battle.skill;
  const me = battle.enemy;
  if (!skill || (sk.enemyCd || 0) > 0) return false;
  for (const [gem, n] of Object.entries(skill.cost)) if ((me.mana[gem] || 0) < n) return false;
  for (const [gem, n] of Object.entries(skill.cost)) me.mana[gem] -= n;
  sk.enemyCd = skill.cooldown;
  showToast(me.name + ': «' + skill.name + '»', 1400);
  logBattle('enemy', me.name + ': «' + skill.name + '»');
  vibrate(30);
  skillStrike(skill, 'enemy');
  skillAfterHeroHit();
  if (battle.hero.hp <= 0) battle.over = true;
  renderBattle();
  await sleep(600);
  return true;
}
