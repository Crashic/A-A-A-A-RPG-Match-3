// Конец боя. Победа: опыт за врага (WoW) + опыт и золото с фишек, подъём уровня, сохранение.
// Поражение: награды нет. Показывает окно итогов.
function finishBattle(won) {
  clearHint();
  const save = battle.save;
  const e = battle.enemyInfo;
  const result = { won, enemy: e.name, killXp: 0, gemXp: 0, gold: 0, levelUps: 0, level: save.level };
  if (won) {
    result.killXp = mobXp(save.level, e.level, e.elite);
    result.gemXp = save.level >= MAX_LEVEL ? 0 : battle.gained.xp;
    result.gold = battle.gained.gold;
    save.gold = (save.gold || 0) + result.gold;
    result.levelUps = grantXp(save, result.killXp + result.gemXp);
    result.level = save.level;
    saveSlot(battle.slot, save);
    battle.gained = { xp: 0, gold: 0 }; // уже начислено в сохранение
    vibrate([30, 40, 30]);
  } else {
    vibrate(80);
  }
  renderBattle();
  showBattleResult(result);
}
