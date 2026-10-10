// Усиление фишки gemId в серии игрока от навыков, %: постоянные (gemPct, stack), первые ходы (allPct),
// временные (buff) и разовые (pendingPct — после навыка или первая серия боя).
function skillGemPct(gemId, count) {
  const sk = battle.skill;
  let pct = 0;
  for (const e of hasPassive('gemPct')) if (e.gem === gemId && count >= (e.min || 1)) pct += e.pct;
  for (const e of hasPassive('stack'))
    if (e.gem === gemId) pct += Math.min(e.max, Math.floor(sk.heroTurns / e.every) * e.pct);
  for (const e of hasPassive('allPct')) if (sk.heroTurns < e.firstTurns) pct += e.pct;
  if (sk.buff && sk.buff.turns > 0) pct += sk.buff.pct;
  pct += sk.pendingPct;
  return pct;
}
