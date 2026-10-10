// Опыт за победу над врагом, формула WoW Classic:
// свой уровень — 45 + 5×уровень; враг выше — +5 % за уровень (не больше +4);
// враг ниже — меньше, до нуля у «серых». Элита — ×2.
function mobXp(heroLevel, mobLevel, elite = false) {
  if (heroLevel >= MAX_LEVEL) return 0;
  if (mobLevel <= grayLevel(heroLevel)) return 0;
  const base = heroLevel * 5 + 45;
  let xp;
  if (mobLevel >= heroLevel) xp = base * (1 + 0.05 * Math.min(mobLevel - heroLevel, 4));
  else xp = base * (1 - (heroLevel - mobLevel) / zeroDifference(heroLevel));
  return Math.max(0, Math.round(xp * (elite ? 2 : 1)));
}
