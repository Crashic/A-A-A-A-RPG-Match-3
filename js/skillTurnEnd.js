// Конец хода стороны side: у игрока — счёт ходов, усиления, «одна серия без каскада»;
// у врага — истекают защиты на число ходов.
function skillTurnEnd(side) {
  const sk = battle.skill;
  if (side === 'hero') {
    if (sk.steps === 1) {
      for (const e of hasPassive('single')) {
        if (e.give === 'shield') {
          const add = Math.min(battle.hero.maxShield - battle.hero.shield, e.value * battle.hero.shieldPerGem);
          battle.hero.shield += add;
          if (add) showFloat('hero', '+' + add + ' щит', 'shield');
        } else if (e.give === 'pearl') {
          convertSafeGem(GEM_TYPES.findIndex(g => g.id === 'pearl'));
        }
      }
    }
    if (sk.steps > 0) {
      sk.heroTurns++;
      // перезарядка боевых навыков считается ходами игрока
      for (const id in sk.cooldowns || {}) if (--sk.cooldowns[id] <= 0) delete sk.cooldowns[id];
    }
    if (sk.buff && sk.steps > 0 && --sk.buff.turns <= 0) sk.buff = null;
    if (sk.steps > 0 && sk.weaken && --sk.weaken.turns <= 0) sk.weaken = null; // ослабление от врага
  } else {
    if (sk.enemyCd > 0) sk.enemyCd--; // перезарядка навыка врага
    for (const w of sk.wards) if ('turns' in w) w.turns--;
    sk.wards = sk.wards.filter(w => !('turns' in w) || w.turns > 0);
  }
  sk.steps = 0;
}
