// Урон героя с учётом ослабления от навыка врага (battle.skill.weaken { pct, turns }).
function heroWeakened(amount) {
  const w = battle.skill.weaken;
  return w && w.turns > 0 ? Math.max(1, Math.round(amount * (1 - w.pct / 100))) : amount;
}
