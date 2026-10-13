// Удар активного навыка (act 'strike'): у героя — боевые навыки классов (js/classSkills.js),
// у врага — навыки врагов (js/enemySkills.js). side — кто бьёт: 'hero' | 'enemy'.
// Урон = mult × атака (крит — Ловкость), pierce — мимо щита, breakShield — снос щита,
// drain — кража маны, ward (герой) / weaken (враг) — ослабление ударов противника,
// selfShieldPct — щит себе, lifesteal — лечение от урона. Возвращает нанесённый урон по здоровью.
function skillStrike(skill, side = 'hero') {
  const foeSide = side === 'hero' ? 'enemy' : 'hero';
  const me = battle[side];
  const foe = battle[foeSide];
  const sk = battle.skill;
  if (skill.breakShield && foe.shield) { showFloat(foeSide, '−' + foe.shield, 'shield'); foe.shield = 0; }
  const c = rollCrit(me, Math.max(1, Math.round(me.attack * skill.mult)));
  let amount = c.amount;
  if (c.crit) showFloat(foeSide, tr("ui.Крит!"), 'damage');
  if (side === 'hero') amount = heroWeakened(amount);   // враг ослабил ваши удары
  else amount = skillReduceHit(amount);                 // ваши защиты от врага
  let hp, shield = 0;
  if (skill.pierce) { hp = Math.min(foe.hp, amount); foe.hp -= hp; }
  else {
    const hit = dealDamage(foe, amount);
    hp = hit.hp;
    shield = hit.shield;
    if (shield) showFloat(foeSide, '−' + shield, 'shield');
  }
  if (hp) showFloat(foeSide, '−' + hp, 'damage');
  if (side === 'enemy') { sk.lastEnemyLoss.hp += hp; sk.lastEnemyLoss.shield += shield; }
  if (skill.drain) for (const id of MANA_COLORS) foe.mana[id] = Math.max(0, foe.mana[id] - skill.drain);
  if (skill.ward && side === 'hero') sk.wards.push({ pct: skill.ward.pct, turns: skill.ward.turns });
  if (skill.weaken && side === 'enemy') sk.weaken = { pct: skill.weaken.pct, turns: skill.weaken.turns };
  if (skill.selfShieldPct) {
    const add = Math.min(me.maxShield - me.shield, Math.max(1, Math.round(me.maxShield * skill.selfShieldPct / 100)));
    me.shield += add;
    if (add) showFloat(side, '+' + add + tr("ui. щит"), 'shield');
  }
  if (skill.lifesteal) {
    const add = Math.min(me.maxHp - me.hp, Math.round(hp * skill.lifesteal / 100 * (1 + (me.healPct || 0) / 100)));
    me.hp += add;
    if (add) showFloat(side, '+' + add, 'heal');
  }
  if (foe.hp <= 0) battle.over = true;
  return hp;
}
