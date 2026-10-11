// Собранные фишки срабатывают для того, кто ходит (роли — из дизайн-системы):
// топливо — урон, детали — щит, металл, травы и плёнка — мана,
// документы — опыт, радиация — изолента (опыт и изолента — только игроку).
// Бонус класса игрока (+1 % к своему ресурсу, gemBonus) и навыки (skillGemPct) усиливают эффект фишки;
// характеристики героя (createHeroFighter): атака, крит (rollCrit), приток и запас маны, щит за Детали;
// навыки срабатывают после серии (skillAfterGather) и ослабляют удары врага (skillReduceHit, skillAfterHeroHit).
function applyMatchEffects(cells) {
  if (!battle || battle.over) return;
  const count = countGems(match3.grid, cells);
  const side = battle.turn;
  const foeSide = side === 'hero' ? 'enemy' : 'hero';
  const me = battle[side];
  const foe = battle[foeSide];
  const isHero = side === 'hero';

  const run = longestRun(match3.grid);
  for (const id in count) {
    // бонус расы-класса (+1 %) и навыки (js/skillGemPct.js)
    const mult = isHero ? 1 + (gemBonus(battle.save, id) + skillGemPct(id, count[id])) / 100 : 1;
    const n = count[id] * mult;
    const kind = GEM_EFFECTS[id].kind;
    if (kind === 'damage') {
      let amount = Math.round(n * me.attack);
      const c = rollCrit(me, amount); // Ловкость: шанс крита (у героя и врага)
      amount = c.amount;
      if (c.crit) showFloat(foeSide, 'Крит!', 'damage');
      if (!isHero) amount = skillReduceHit(amount); // защиты и навыки игрока
      else amount = heroWeakened(amount);           // навык врага ослабил ваши удары
      const hit = dealDamage(foe, amount);
      if (!isHero) { battle.skill.lastEnemyLoss.hp += hit.hp; battle.skill.lastEnemyLoss.shield += hit.shield; }
      if (hit.shield) showFloat(foeSide, '−' + hit.shield, 'shield');
      if (hit.hp) showFloat(foeSide, '−' + hit.hp, 'damage');
    } else if (kind === 'shield') {
      const add = Math.min(me.maxShield - me.shield, Math.round(n * me.shieldPerGem));
      me.shield += add;
      if (add) showFloat(side, '+' + add + ' щит', 'shield');
    } else if (kind === 'heal') {
      const add = Math.min(me.maxHp - me.hp, Math.round(n * me.healPerGem));
      me.hp += add;
      if (add) showFloat(side, '+' + add, 'heal');
    } else if (kind === 'mana') {
      // Интеллект героя: больше маны с фишек и больше запас
      me.mana[id] = Math.min(me.manaMax || MANA_MAX, me.mana[id] + Math.round(n * (1 + (me.manaPct || 0) / 100)));
    } else if (isHero && kind === 'xp') {
      const add = Math.round(n * me.xpPerGem);
      battle.gained.xp += add;
      showFloat(side, '+' + add + ' опыта', 'xp');
    } else if (isHero && kind === 'tape') {
      const add = Math.round(n * me.tapePerGem);
      battle.gained.tape += add;
      showFloat(side, '+' + add + ' изоленты', 'tape');
    }
  }
  if (isHero) skillAfterGather(count, run);
  else skillAfterHeroHit();
  if (foe.hp <= 0) battle.over = true;
  renderBattle();
}
