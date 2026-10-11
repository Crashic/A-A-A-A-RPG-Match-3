// Начинает бой с врагом enemyId: бойцы с полным здоровьем, новое поле, первый ход — игрока.
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
    enemy: saved ? saved.enemy : createFighter(e.name, e.level, e.hp * (e.elite ? ELITE_HP : 1), e.atk * (e.elite ? ELITE_ATK : 1)),
    turn: saved ? saved.turn : 'hero',
    over: false,
    gained: saved ? Object.assign({ xp: 0, tape: 0 }, saved.gained) : { xp: 0, tape: 0 },
    skill: saved && saved.skill ? Object.assign(createSkillState(), saved.skill) : createSkillState()
  };
  for (const side of ['hero', 'enemy']) // бой, сохранённый до новой маны, — добавить её с нуля
    for (const id of MANA_COLORS) if (battle[side].mana[id] === undefined) battle[side].mana[id] = 0;
  if (!saved) skillBattleStart(); // стартовые навыки: мана, пометки
  const current = battle;
  renderBattle();
  showFirstLegend(); // в первом бою — подсказка, какая фишка что даёт
  await startMatch3(saved ? saved.grid : null);
  if (battle !== current) return;
  saveBattle();
  if (battle.turn === 'enemy') await enemyTurn();
}
