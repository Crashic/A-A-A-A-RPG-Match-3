// Выбор врага на карте: возвращает на экран боя и начинает бой с ним.
// Если текущий бой ещё идёт — сначала спрашивает.
function chooseEnemy(id) {
  const go = () => {
    closeBattleResult();
    battle = null;
    const slot = getActiveSlot();
    const save = loadSlot(slot);
    save.lastEnemy = id;
    saveSlot(slot, save);
    goBack(); // назад на экран боя — renderScreen('game') начнёт бой с выбранным врагом
  };
  if (battle && !battle.over && battle.enemyId === id) { goBack(); return; } // тот же враг — вернуться в бой
  if (battle && !battle.over) showConfirm('Бросить текущий бой?', 'Бросить', go);
  else go();
}
