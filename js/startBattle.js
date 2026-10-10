// Начинает бой с врагом enemyId: бойцы с полным здоровьем, новое поле, первый ход — игрока.
function startBattle(enemyId) {
  const slot = getActiveSlot();
  const save = loadSlot(slot);
  if (!save) return;
  const found = findEnemy(enemyId) || findEnemy(suggestEnemy(save.level));
  const e = found.enemy;
  save.lastEnemy = e.id;
  saveSlot(slot, save);
  battle = {
    slot,
    save,
    enemyId: e.id,
    enemyInfo: e,
    hero: createFighter(save.name, save.level),
    enemy: createFighter(e.name, e.level, e.hp * (e.elite ? ELITE_HP : 1), e.atk * (e.elite ? ELITE_ATK : 1)),
    turn: 'hero',
    over: false,
    gained: { xp: 0, gold: 0 }
  };
  renderBattle();
  startMatch3();
}
