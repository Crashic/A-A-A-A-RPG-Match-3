// Жребий на первый ход боя по наглости (инициативе): поровну — орёл или решка, иначе — шанс firstTurnChance.
// Пишет итог в лог боя (саму монетку показывает startBattle — showCoinFlip). Возвращает 'hero' или 'enemy'.
function rollFirstTurn() {
  const h = battle.hero.ini || 0;
  const e = battle.enemy.ini || 0;
  const chance = firstTurnChance(h, e);
  const turn = Math.random() * 100 < chance ? 'hero' : 'enemy';
  const how = h === e ? 'Наглость поровну (' + h + ') — монетка: ' + (turn === 'hero' ? 'орёл' : 'решка')
    : 'Наглость ' + h + ' против ' + e + ' — жребий (' + chance + ' % на вас)';
  logBattle('sys', how + '. ' + (turn === 'hero' ? 'Первыми ходите вы.' : 'Первым ходит ' + battle.enemy.name + '.'));
  return turn;
}
