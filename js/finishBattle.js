// Конец боя. Опыт и изолента, собранные с фишек, остаются и при поражении.
// Победа добавляет опыт за врага (WoW). Уровни, сохранение, окно итогов.
function finishBattle(won) {
  clearHint();
  clearBattle(battle.slot);
  const save = battle.save;
  const e = battle.enemyInfo;
  const result = { won, enemy: e.name, killXp: 0, gemXp: 0, tape: 0, levelUps: 0, level: save.level };
  result.killXp = won ? mobXp(save.level, e.level, e.elite) : 0;
  result.gemXp = save.level >= MAX_LEVEL ? 0 : battle.gained.xp;
  result.tape = battle.gained.tape;
  save.tape = (save.tape || 0) + result.tape;
  if (battle.skill.notes) save.notes = Math.min(5, (save.notes || 0) + battle.skill.notes); // «Пометка на полях»
  result.levelUps = grantXp(save, result.killXp + result.gemXp);
  result.level = save.level;
  saveSlot(battle.slot, save);
  battle.gained = { xp: 0, tape: 0 }; // уже начислено в сохранение
  vibrate(won ? [30, 40, 30] : 80);
  renderBattle();
  showBattleResult(result);
}
