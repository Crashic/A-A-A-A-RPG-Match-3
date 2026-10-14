// Пока идёт сценарий учебного боя, здоровье бойца не падает ниже доли TUTORIAL_HP_FLOOR.
function tutorialHpFloor(f) {
  if (!tutorialActive()) return;
  const k = f === battle.enemy ? TUTORIAL_HP_FLOOR.enemy : f === battle.hero ? TUTORIAL_HP_FLOOR.hero : 0;
  f.hp = Math.max(f.hp, Math.ceil(f.maxHp * k));
}
