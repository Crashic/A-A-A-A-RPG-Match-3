// Начинает бой с врагом enemyId: бойцы с полным здоровьем, новое поле, первый ход — по жребию наглости (rollFirstTurn).
// saved — сохранённый незаконченный бой (loadBattle): продолжить его с того же места.
async function startBattle(enemyId, saved = null) {
  const slot = getActiveSlot();
  const save = loadSlot(slot);
  if (!save) return;
  let found = findEnemy(saved ? saved.enemyId : enemyId);
  if (!found || !zoneAllowed(save, found.zone)) found = findEnemy(suggestEnemy(save)); // чужая или старая локация
  const e = found.enemy;
  save.lastEnemy = e.id;
  saveSlot(slot, save);
  battle = {
    slot,
    save,
    enemyId: e.id,
    enemyInfo: e,
    hero: saved ? saved.hero : createHeroFighter(save), // с характеристиками героя
    enemy: saved ? saved.enemy : createEnemyFighter(e), // с характеристиками врага
    turnNo: saved ? saved.turnNo || 1 : 1, // номер хода (табличка «чей ход»)
    turn: saved ? saved.turn : 'hero', // новый бой — жребий по наглости (rollFirstTurn) ниже
    over: false,
    gained: saved ? Object.assign({ xp: 0, tape: 0 }, saved.gained) : { xp: 0, tape: 0 },
    skill: saved && saved.skill ? Object.assign(createSkillState(), saved.skill) : createSkillState(),
    log: saved && saved.log ? saved.log : []
  };
  for (const side of ['hero', 'enemy']) { // бой, сохранённый до новой маны, — добавить её с нуля
    const m = battle[side].mana;
    if (m.sapphire !== undefined && m.topaz === undefined) m.topaz = m.sapphire; // с 0.8.9 мана — топаз, сапфир — изолента
    delete m.sapphire;
    for (const id of MANA_COLORS) if (m[id] === undefined) m[id] = 0;
  }
  if (!saved) skillBattleStart(); // стартовые навыки: мана, пометки
  const current = battle;
  if (!saved) warnBagFull(save); // сумка полна — добыча упадёт и её разворуют
  if (!saved && storyTutorialBattle(save, e.id)) { // сюжет: учебный бой на заготовленном поле, враг слабее, первым ходит герой
    battle.tutorial = { phase: 0 };
    battle.enemy.attack = Math.max(1, Math.round(battle.enemy.attack * TUTORIAL_ENEMY_ATK));
  }
  if (!saved) {
    logBattle('sys', tr("ui.Бой: ") + e.name + tr("ui., ур. ") + e.level + (e.elite ? tr("ui. · элита") : ''));
    if (battle.tutorial) { battle.turn = 'hero'; logBattle('sys', tr("ui.Учебный бой: первыми ходите вы.")); }
    else battle.turn = rollFirstTurn();
  }
  renderBattle();
  renderBattleLog();
  // новый бой — монетка: мечи (ходите вы) или щит (ходит враг)
  const flip = saved ? null : showCoinFlip(battle.turn, battle.turn === 'hero' ? tr("ui.Вы ходите первым!") : e.name + tr("ui. ходит первым"));
  await startMatch3(saved ? saved.grid : null);
  if (flip) await flip;
  if (battle !== current) return;
  showTurnPlate(); // табличка «чей ход»
  if (!saved) storyEvent('battle', e.id); // сюжет: начат бой с целью (акт 6)
  if (battle.tutorial) tutorialStep(); // учебный бой: первая фаза
  else showFirstLegend(); // в первом бою — подсказка, какая фишка что даёт
  tutorialCheck(); // подсказки сюжета
  saveBattle();
  if (battle.turn === 'enemy') await enemyTurn();
}
