// Собранные фишки срабатывают для того, кто ходит (роли — из дизайн-системы):
// топливо — урон, детали — щит, металл, травы и плёнка — мана,
// документы — опыт, радиация — изолента (опыт и изолента — только игроку).
// Бонус класса игрока (+1 % к своему ресурсу, gemBonus) и навыки (skillGemPct) усиливают эффект фишки;
// характеристики героя (createHeroFighter): атака, крит (rollCrit), приток и запас маны, щит за Детали;
// Возвращает { id фишки: сколько дала } (подписи showGemLabels и лог боя logBattle).
// навыки срабатывают после серии (skillAfterGather) и ослабляют удары врага (skillReduceHit, skillAfterHeroHit).
function applyMatchEffects(cells) {
  const gains = {}; // что дала каждая фишка — для подписей над рядом и лога
  if (!battle || battle.over) return gains;
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
      if (isHero && heroTwoHanded(battle.save) && (battle.skill.swingCd || 0) > 0) { // двуручное: замах, удар через ход
        showFloat(foeSide, tr("ui.Замах…"), 'shield');
        logBattle('hero', tr("ui.Вы замахиваетесь двуручным — удар в следующий ход"));
        continue;
      }
      if (isHero && heroTwoHanded(battle.save)) battle.skill.swingHit = true;
      let amount = Math.round(n * me.attack);
      const c = rollCrit(me, amount); // Ловкость: шанс крита (у героя и врага)
      amount = c.amount;
      if (c.crit) showFloat(foeSide, tr("ui.Крит!"), 'damage');
      if (!isHero) amount = skillReduceHit(amount); // защиты и навыки игрока
      else amount = heroWeakened(amount);           // навык врага ослабил ваши удары
      const hit = dealDamage(foe, amount);
      gains[id] = hit.hp + hit.shield;
      if (!isHero) { battle.skill.lastEnemyLoss.hp += hit.hp; battle.skill.lastEnemyLoss.shield += hit.shield; }
      if (hit.shield) showFloat(foeSide, '−' + hit.shield, 'shield');
      if (hit.hp) showFloat(foeSide, '−' + hit.hp, 'damage');
    } else if (kind === 'shield') {
      const add = Math.min(me.maxShield - me.shield, Math.round(n * me.shieldPerGem));
      me.shield += add;
      gains[id] = add;
      if (add) showFloat(side, '+' + add + tr("ui. щит"), 'shield');
    } else if (kind === 'heal') {
      const add = Math.min(me.maxHp - me.hp, Math.round(n * me.healPerGem));
      me.hp += add;
      gains[id] = add;
      if (add) showFloat(side, '+' + add, 'heal');
    } else if (kind === 'mana') {
      // Интеллект героя: больше маны с фишек и больше запас
      const before = me.mana[id];
      me.mana[id] = Math.min(me.manaMax || MANA_MAX, me.mana[id] + Math.round(n * (1 + (me.manaPct || 0) / 100)));
      gains[id] = me.mana[id] - before;
    } else if (isHero && kind === 'xp') {
      const add = Math.round(n * me.xpPerGem);
      battle.gained.xp += add;
      gains[id] = add;
      showFloat(side, '+' + add + tr("ui. опыта"), 'xp');
    } else if (isHero && kind === 'tape') {
      const add = Math.round(n * me.tapePerGem);
      battle.gained.tape += add;
      gains[id] = add;
      showFloat(side, '+' + add + tr("ui. изоленты"), 'tape');
    }
  }
  if (isHero) { // собранные героем фишки — для заданий «Собрать фишки» (questProgress)
    battle.gained.gems = battle.gained.gems || {};
    for (const id in count) battle.gained.gems[id] = (battle.gained.gems[id] || 0) + count[id];
    questLiveCheck(); // тост прогресса и трекер заданий
  }
  if (isHero) skillAfterGather(count, run);
  else skillAfterHeroHit();
  const parts = Object.keys(count).filter(id => gains[id]).map(id => gainText(id, gains[id]));
  if (parts.length) logBattle(side, (isHero ? tr("ui.Вы") : me.name) + ': ' + parts.join(', '));
  if (foe.hp <= 0) battle.over = true;
  renderBattle();
  return gains;
}
