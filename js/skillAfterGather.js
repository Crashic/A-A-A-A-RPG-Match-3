// После серии игрока: срабатывания «при сборе» (щит, изолента, защита, снижение урона),
// «Пометка на полях» за 4+, расход разового усиления.
function skillAfterGather(count, run) {
  const sk = battle.skill;
  const hero = battle.hero;
  sk.steps++;
  for (const e of hasPassive('gather')) {
    if ((count[e.gem] || 0) < e.min) continue;
    const key = 'gather:' + e.gem + ':' + e.give;
    if (e.once && sk.triggered[key]) continue;
    if (e.once) sk.triggered[key] = true;
    if (e.give === 'shieldPctMax') {
      const add = Math.min(hero.maxShield - hero.shield, Math.max(1, Math.round(hero.maxShield * e.value / 100)));
      hero.shield += add;
      if (add) showFloat('hero', '+' + add + tr("ui. щит"), 'shield');
    } else if (e.give === 'tape') {
      const add = e.value * hero.tapePerGem;
      battle.gained.tape += add;
      showFloat('hero', '+' + add + tr("ui. изоленты"), 'tape');
    } else if (e.give === 'ward') {
      sk.wards.push({ pct: e.value, hits: 1 });
    } else if (e.give === 'dmgReduce') {
      sk.dmgReduce += e.value;
      showToast(tr("ui.Урон врага −") + e.value + tr("ui.% до конца боя"), 1500);
    }
  }
  if (run >= 4 && hasPassive('notes').length) {
    const add = 2 * hero.xpPerGem;
    battle.gained.xp += add;
    if (sk.notes < hasPassive('notes')[0].max) sk.notes++;
    showFloat('hero', '+' + add + tr("ui. опыта"), 'xp');
  }
  sk.pendingPct = 0;
}
