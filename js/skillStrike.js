// Удар активного навыка (act 'strike', js/classSkills.js): урон, пробитие и снос щита,
// кража маны, ослабление врага, щит себе и вампиризм. Возвращает нанесённый урон.
function skillStrike(skill) {
  const hero = battle.hero;
  const foe = battle.enemy;
  const sk = battle.skill;
  if (skill.breakShield && foe.shield) { showFloat('enemy', '−' + foe.shield, 'shield'); foe.shield = 0; }
  const c = rollCrit(hero, Math.max(1, Math.round(hero.attack * skill.mult))); // Ловкость — шанс крита
  const amount = c.amount;
  if (c.crit) showFloat('enemy', 'Крит!', 'damage');
  let hp;
  if (skill.pierce) { hp = Math.min(foe.hp, amount); foe.hp -= hp; }
  else {
    const hit = dealDamage(foe, amount);
    if (hit.shield) showFloat('enemy', '−' + hit.shield, 'shield');
    hp = hit.hp;
  }
  if (hp) showFloat('enemy', '−' + hp, 'damage');
  if (skill.drain) for (const id of MANA_COLORS) foe.mana[id] = Math.max(0, foe.mana[id] - skill.drain);
  if (skill.ward) sk.wards.push({ pct: skill.ward.pct, turns: skill.ward.turns });
  if (skill.selfShieldPct) {
    const add = Math.min(hero.maxShield - hero.shield, Math.max(1, Math.round(hero.maxShield * skill.selfShieldPct / 100)));
    hero.shield += add;
    if (add) showFloat('hero', '+' + add + ' щит', 'shield');
  }
  if (skill.lifesteal) {
    const add = Math.min(hero.maxHp - hero.hp, Math.round(hp * skill.lifesteal / 100 * (1 + (hero.healPct || 0) / 100)));
    hero.hp += add;
    if (add) showFloat('hero', '+' + add, 'heal');
  }
  if (foe.hp <= 0) battle.over = true;
  return hp;
}
