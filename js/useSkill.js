// Применяет активный навык игрока: списывает ману и делает действие.
// strike — боевой навык класса (skillStrike); show — показать ход; ward — защита; shield / heal — щит / лечение; buff — усиление ходов;
// undo — вернуть отнятое последним ходом врага (ход не тратится);
// calibrate / convert — меняют фишки на поле, серия срабатывает сразу, ход тратится.
async function useSkill(id) {
  const skill = heroSkills(battle.save).find(s => s.id === id);
  if (!skill || !canUseSkill(skill)) return;
  const sk = battle.skill;
  const hero = battle.hero;
  for (const [gem, n] of Object.entries(skill.cost || {})) hero.mana[gem] -= n;
  if (skill.once) sk.used[skill.id] = true;
  if (skill.cooldown) (sk.cooldowns = sk.cooldowns || {})[skill.id] = skill.cooldown;
  for (const e of hasPassive('afterActive')) sk.pendingPct = Math.max(sk.pendingPct, e.pct);
  vibrate(20);
  showToast(skill.name, 1200);
  logBattle('hero', 'Вы: «' + skill.name + '»');

  if (skill.act === 'strike') {
    skillStrike(skill);
    if (battle.over) { renderBattle(); match3.busy = true; await endTurn(false); return; } // враг повержен
  } else if (skill.act === 'show') {
    showBestMove(skill.gem);
  } else if (skill.act === 'ward') {
    sk.wards.push(skill.hits ? { pct: skill.pct, hits: skill.hits } : { pct: skill.pct, turns: skill.turns });
  } else if (skill.act === 'shield') {
    hero.shield = Math.min(hero.maxShield, hero.shield + Math.max(1, Math.round(hero.maxShield * skill.pctMax / 100)));
  } else if (skill.act === 'heal') {
    const add = Math.min(hero.maxHp - hero.hp, Math.round(hero.maxHp * skill.pct / 100 * (1 + (hero.healPct || 0) / 100)));
    hero.hp += add;
    showFloat('hero', '+' + add, 'heal');
  } else if (skill.act === 'buff') {
    sk.buff = { pct: skill.pct, turns: skill.turns };
  } else if (skill.act === 'undo') {
    hero.hp = Math.min(hero.maxHp, hero.hp + sk.lastEnemyLoss.hp);
    hero.shield = Math.min(hero.maxShield, hero.shield + sk.lastEnemyLoss.shield);
    if (sk.lastEnemyLoss.hp) showFloat('hero', '+' + sk.lastEnemyLoss.hp, 'heal');
    sk.lastEnemyLoss = { hp: 0, shield: 0 };
  } else if (skill.act === 'calibrate' || skill.act === 'convert') {
    match3.busy = true;
    clearHint();
    selectGem(null);
    const current = battle;
    if (skill.act === 'calibrate') {
      const cell = calibrateCell(match3.grid);
      if (cell) setGemType(cell.r, cell.c, cell.type);
    } else {
      convertLine(GEM_TYPES.findIndex(g => g.id === skill.to), skill.n);
    }
    renderBattle();
    await sleep(250);
    if (battle !== current) return;
    const result = await resolveBoard();
    if (battle !== current) return;
    await endTurn(result.extra);
    return;
  }
  renderBattle();
  saveBattle();
}
