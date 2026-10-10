// Собранные фишки срабатывают для того, кто ходит (роли — из дизайн-системы):
// топливо — урон, детали — щит, травы — лечение, металл и плёнка — мана,
// документы — опыт, радиация — изолента (опыт и изолента — только игроку).
// Бонус класса игрока (+1 % к своему ресурсу) усиливает эффект фишки — gemBonus.
function applyMatchEffects(cells) {
  if (!battle || battle.over) return;
  const count = countGems(match3.grid, cells);
  const side = battle.turn;
  const foeSide = side === 'hero' ? 'enemy' : 'hero';
  const me = battle[side];
  const foe = battle[foeSide];
  const isHero = side === 'hero';

  for (const id in count) {
    const mult = isHero ? 1 + gemBonus(battle.save, id) / 100 : 1;
    const n = count[id] * mult;
    const kind = GEM_EFFECTS[id].kind;
    if (kind === 'damage') {
      const hit = dealDamage(foe, Math.round(n * me.attack));
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
      me.mana[id] = Math.min(MANA_MAX, me.mana[id] + Math.round(n));
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
  if (foe.hp <= 0) battle.over = true;
  renderBattle();
}
