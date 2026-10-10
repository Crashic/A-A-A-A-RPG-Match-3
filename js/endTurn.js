// Конец хода: победа/поражение, ещё ход тому же или передача хода сопернику.
async function endTurn(extra) {
  if (!battle) return;
  if (battle.over) { match3.busy = false; finishBattle(battle.hero.hp > 0); return; }
  if (extra) showToast(battle.turn === 'hero' ? 'Ещё ход!' : 'Враг ходит ещё раз', 1500);
  else battle.turn = battle.turn === 'hero' ? 'enemy' : 'hero';
  renderBattle();
  if (battle.turn === 'enemy') { await enemyTurn(); return; }
  match3.busy = false;
  scheduleHint();
}
