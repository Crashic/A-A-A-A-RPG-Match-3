// Боец в начале боя: полное здоровье, щит и мана с нуля (как в Puzzle Quest).
function createFighter(name, level, hpMul = 1, atkMul = 1) {
  const s = combatStats(level, hpMul, atkMul);
  const mana = {};
  for (const id of MANA_COLORS) mana[id] = 0;
  return Object.assign({ name, level, hp: s.maxHp, shield: 0, mana }, s);
}
