// Чит «KILL ALL»: мгновенно убивает текущего врага (только в режиме читов, в ход игрока).
async function killAll() {
  if (!settings.cheatsOn || !battle || battle.over || !isHeroTurn() || match3.busy) return;
  vibrate([40, 30, 80]);
  showFloat('enemy', '−' + battle.enemy.hp, 'damage');
  battle.enemy.hp = 0;
  battle.over = true;
  match3.busy = true;
  renderBattle();
  await sleep(400);
  await endTurn(false); // конец боя: победа, карта и итоги
}
