// Конец боя (surrendered — герой сдался: набранное в бою уже обнулено в surrender). Опыт и изолента, собранные с фишек, остаются и при поражении.
// Победа добавляет опыт за врага (WoW) и добычу (rollDrops → сумка). Уровни, сохранение; затем — карта врагов и окно итогов поверх неё.
function finishBattle(won, surrendered = false) {
  clearHint();
  clearBattle(battle.slot);
  const save = battle.save;
  const e = battle.enemyInfo;
  const result = { won, surrendered, enemy: e.name, killXp: 0, gemXp: 0, tape: 0, levelUps: 0, level: save.level };
  result.killXp = won ? mobXp(save.level, e.level, e.elite) : 0;
  result.gemXp = save.level >= MAX_LEVEL ? 0 : battle.gained.xp;
  result.tape = battle.gained.tape;
  save.tape = (save.tape || 0) + result.tape;
  if (battle.skill.notes) save.notes = Math.min(5, (save.notes || 0) + battle.skill.notes); // «Пометка на полях»
  const fresh = loadSlot(battle.slot); // снаряжение и сумка — как сейчас в ячейке (могли меняться читами)
  if (fresh) { save.gear = fresh.gear; save.bag = fresh.bag; save.packs = fresh.packs; }
  if (won) Object.assign(result, addToBag(save, rollDrops(e.level, e.elite))); // { added, lost }
  if (won) save.wins = (save.wins || 0) + 1; // для обновления прилавка торговца
  result.quests = questProgress(save, won, e.id, battle.gained.gems); // задания с доски
  result.levelUps = grantXp(save, result.killXp + result.gemXp);
  result.level = save.level;
  saveSlot(battle.slot, save);
  battle.gained = { xp: 0, tape: 0 }; // уже начислено в сохранение
  vibrate(won ? [30, 40, 30] : 80);
  renderBattle();
  // экран боя убирается: вместо него в истории — карта, поверх неё окно итогов
  battle = null;
  closeBattleMenu();
  mapZoneId = null;
  renderMap();
  history.replaceState({ screen: 'map', depth: navDepth() }, '');
  showScreen('map', false);
  showBattleResult(result);
}
