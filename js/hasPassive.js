// Пассивные эффекты героя текущего боя с полем on === kind (из навыков класса и расы).
function hasPassive(kind) {
  if (!battle) return [];
  const out = [];
  for (const s of heroSkills(battle.save))
    if (s.type === 'passive') for (const e of s.effects) if (e.on === kind) out.push(e);
  return out;
}
