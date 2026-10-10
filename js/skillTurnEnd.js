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
    if (sk.steps > 0) sk.heroTurns++;
    if (sk.buff && sk.steps > 0 && --sk.buff.turns <= 0) sk.buff = null;
  } else {
    for (const w of sk.wards) if ('turns' in w) w.turns--;
    sk.wards = sk.wards.filter(w => !('turns' in w) || w.turns > 0);
  }
  sk.steps = 0;
}
