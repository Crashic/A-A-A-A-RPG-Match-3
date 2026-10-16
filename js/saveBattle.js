// Сохраняет незаконченный бой (бойцы, чей ход, набранное, поле), чтобы после выхода
// в меню или закрытия игры продолжить с того же места. Вызывается после каждого хода.
function saveBattle() {
  if (!battle || battle.over || !match3 || !match3.grid) return;
  const data = {
    enemyId: battle.enemyId,
    hero: battle.hero,
    enemy: battle.enemy,
    turn: battle.turn,
    turnNo: battle.turnNo || 1,
    gained: battle.gained,
    skill: battle.skill,
    log: battle.log,
    grid: match3.grid,
    version: APP_VERSION
  };
  try { localStorage.setItem(battleKey(battle.slot), JSON.stringify(data)); } catch (e) {}
}
