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
    turn: saved ? saved.turn : 'hero', // новый бой — жребий по наглости (rollFirstTurn) ниже
    over: false,
    gained: saved ? Object.assign({ xp: 0, tape: 0 }, saved.gained) : { xp: 0, tape: 0 },
    skill: saved && saved.skill ? Object.assign(createSkillState(), saved.skill) : createSkillState(),
    log: saved && saved.log ? saved.log : []
  };
  for (const side of ['hero', 'enemy']) // бой, сохранённый до новой маны, — добавить её с нуля
    for (const id of MANA_COLORS) if (battle[side].mana[id] === undefined) battle[side].mana[id] = 0;
  if (!saved) skillBattleStart(); // стартовые навыки: мана, пометки
  const current = battle;
  if (!saved) warnBagFull(save); // сумка полна — добыча упадёт и её разворуют
  if (!saved) { logBattle('sys', 'Бой: ' + e.name + ', ур. ' + e.level + (e.elite ? ' · элита' : '')); battle.turn = rollFirstTurn(); }
  renderBattle();
  renderBattleLog();
  // новый бой — монетка: мечи (ходите вы) или щит (ходит враг)
  const flip = saved ? null : showCoinFlip(battle.turn, battle.turn === 'hero' ? 'Вы ходите первым!' : e.name + ' ходит первым');
  await startMatch3(saved ? saved.grid : null);
  if (flip) await flip;
  if (battle !== current) return;
  showFirstLegend(); // в первом бою — подсказка, какая фишка что даёт
  tutorialCheck(); // обучение в бою
  saveBattle();
  if (battle.turn === 'enemy') await enemyTurn();
}
