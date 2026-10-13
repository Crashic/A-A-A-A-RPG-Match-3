// Шанс (в %), что первым ходит герой, при наглости героя hero и врага foe.
function firstTurnChance(hero, foe) {
  if (hero === foe) return 50;
  return Math.max(INI_MIN_PCT, Math.min(INI_MAX_PCT, 50 + (hero - foe) * INI_STEP_PCT));
}
