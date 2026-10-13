// Удар врага по игроку: ослабляют первый удар (firstHit), постоянное снижение (dmgReduce)
// и защиты (wards: на число ударов или ходов врага). Возвращает итоговый урон.
function skillReduceHit(amount) {
  const sk = battle.skill;
  let pct = sk.dmgReduce;
  for (const e of hasPassive('dmgReduce')) pct += e.pct;
  if (!sk.firstHitDone) {
    sk.firstHitDone = true;
    for (const e of hasPassive('firstHit')) pct += e.pct;
  }
  for (const w of sk.wards) {
    pct += w.pct;
    if (w.hits) w.hits--;
  }
  sk.wards = sk.wards.filter(w => !('hits' in w) || w.hits > 0);
  const result = Math.max(0, Math.round(amount * (1 - Math.min(100, pct) / 100)));
  if (result < amount) showFloat('hero', tr("ui.защита −") + (amount - result), 'shield');
  return result;
}
