// Собранные фишки срабатывают для того, кто ходит: рубин — урон, жемчуг — щит,
// сапфир/изумруд/аквамарин — мана, аметист — опыт, топаз — золото (опыт и золото — только игроку).
function applyMatchEffects(cells) {
  if (!battle || battle.over) return;
  const count = countGems(match3.grid, cells);
  const side = battle.turn;
  const me = battle[side];
  const foe = battle[side === 'hero' ? 'enemy' : 'hero'];
  const foeSide = side === 'hero' ? 'enemy' : 'hero';

  for (const id in count) {
    const n = count[id];
    const kind = GEM_EFFECTS[id].kind;
    if (kind === 'damage') {
      const hit = dealDamage(foe, n * me.attack);
      if (hit.shield) showFloat(foeSide, '−' + hit.shield, 'shield');
      if (hit.hp) showFloat(foeSide, '−' + hit.hp, 'damage');
    } else if (kind === 'shield') {
      const add = Math.min(me.maxShield - me.shield, n * me.shieldPerGem);
      me.shield += add;
      if (add) showFloat(side, '+' + add, 'shield');
    } else if (kind === 'mana') {
      me.mana[id] = Math.min(MANA_MAX, me.mana[id] + n);
    } else if (side === 'hero' && kind === 'xp') {
      const add = n * me.xpPerGem;
      battle.gained.xp += add;
      showFloat(side, '+' + add + ' опыта', 'xp');
    } else if (side === 'hero' && kind === 'gold') {
      const add = n * me.goldPerGem;
      battle.gained.gold += add;
      showFloat(side, '+' + add + ' зол.', 'gold');
    }
  }
  if (foe.hp <= 0) battle.over = true;
  renderBattle();
}
