// Конец хода: победа/поражение, ещё ход тому же или передача хода сопернику.
// Состояние боя сохраняется после каждого хода (saveBattle).
async function endTurn(extra) {
  if (!battle) return;
  if (battle.over) { match3.busy = false; finishBattle(battle.hero.hp > 0); return; }
  skillTurnEnd(battle.turn); // навыки: счёт ходов, усиления, защиты
  if (extra) { showToast(battle.turn === 'hero' ? tr("ui.Ещё ход!") : tr("ui.Враг ходит ещё раз"), 1500); logBattle('sys', battle.turn === 'hero' ? tr("ui.Ещё ход!") : tr("ui.Враг ходит ещё раз")); }
  else battle.turn = battle.turn === 'hero' ? 'enemy' : 'hero';
  renderBattle();
  saveBattle();
  if (battle.turn === 'enemy') { await enemyTurn(); return; }
  match3.busy = false;
  renderSkillBar();
  scheduleHint();
  if (tutorialActive()) tutorialStep(); // учебный бой: следующая фаза
}
