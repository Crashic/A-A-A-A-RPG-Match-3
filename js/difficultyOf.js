// Цвет сложности врага, как в WoW: grey — без опыта, green — слабее,
// yellow — ровня (±2), orange — на 3–4 выше, red — на 5 и больше.
function difficultyOf(heroLevel, mobLevel) {
  const d = mobLevel - heroLevel;
  if (d >= 5) return 'red';
  if (d >= 3) return 'orange';
  if (d >= -2) return 'yellow';
  if (mobLevel <= grayLevel(heroLevel)) return 'grey';
  return 'green';
}
