// Запись в лог боя (чат слева внизу): side — 'hero' | 'enemy' | 'sys' (цвет строки), text — коротко.
// Хранится в battle.log (не больше BATTLE_LOG_MAX строк, сохраняется с боем), показывается renderBattleLog.
const BATTLE_LOG_MAX = 40;
function logBattle(side, text) {
  if (!battle) return;
  battle.log = battle.log || [];
  battle.log.push({ s: side, t: text });
  if (battle.log.length > BATTLE_LOG_MAX) battle.log.splice(0, battle.log.length - BATTLE_LOG_MAX);
  renderBattleLog();
}
