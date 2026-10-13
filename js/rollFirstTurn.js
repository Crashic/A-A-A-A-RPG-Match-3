// Жребий на первый ход боя по наглости (инициативе): поровну — орёл или решка, иначе — шанс firstTurnChance.
// Пишет итог в лог боя (саму монетку показывает startBattle — showCoinFlip). Возвращает 'hero' или 'enemy'.
function rollFirstTurn() {
  const h = battle.hero.ini || 0;
  const e = battle.enemy.ini || 0;
  const chance = firstTurnChance(h, e);
  const turn = Math.random() * 100 < chance ? 'hero' : 'enemy';
  const how = h === e ? tr("ui.Наглость поровну (") + h + tr("ui.) — монетка: ") + (turn === 'hero' ? tr("ui.орёл") : tr("ui.решка"))
    : tr("ui.Наглость ") + h + tr("ui. против ") + e + tr("ui. — жребий (") + chance + tr("ui. % на вас)");
  logBattle('sys', how + '. ' + (turn === 'hero' ? tr("ui.Первыми ходите вы.") : tr("ui.Первым ходит ") + battle.enemy.name + '.'));
  return turn;
}
