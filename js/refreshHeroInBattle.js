// Режим читов: после изменения уровня или характеристик посреди боя пересчитывает героя
// (createHeroFighter), сохраняя потерянное здоровье, щит и ману. Вне боя ничего не делает.
function refreshHeroInBattle() {
  if (!battle || battle.over) return;
  const save = loadSlot(battle.slot);
  if (!save) return;
  const old = battle.hero;
  const f = createHeroFighter(save);
  f.hp = Math.max(1, Math.min(f.maxHp, f.maxHp - (old.maxHp - old.hp))); // та же потеря здоровья
  f.shield = Math.min(f.maxShield, old.shield);
  for (const id of MANA_COLORS) f.mana[id] = Math.min(f.manaMax, old.mana[id] || 0);
  battle.hero = f;
  battle.save = Object.assign(battle.save, { level: save.level, xp: save.xp, points: save.points, cheat: save.cheat, tape: save.tape, gear: save.gear, bag: save.bag });
  renderBattle();
  saveBattle();
}
