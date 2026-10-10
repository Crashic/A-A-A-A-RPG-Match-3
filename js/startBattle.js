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
    hero: saved ? saved.hero : createFighter(save.name, save.level),
    enemy: saved ? saved.enemy : createFighter(e.name, e.level, e.hp * (e.elite ? ELITE_HP : 1), e.atk * (e.elite ? ELITE_ATK : 1)),
    turn: saved ? saved.turn : 'hero',
    over: false,
    gained: saved ? Object.assign({ xp: 0, tape: 0 }, saved.gained) : { xp: 0, tape: 0 }
  };
  const current = battle;
  renderBattle();
  await startMatch3(saved ? saved.grid : null);
  if (battle !== current) return;
  saveBattle();
  if (battle.turn === 'enemy') await enemyTurn();
}
