// Выбор врага на карте: возвращает на экран боя и начинает бой с ним.
// Если текущий бой ещё идёт — сначала спрашивает.
function chooseEnemy(id) {
  const go = () => {
    closeBattleResult();
    battle = null;
    const slot = getActiveSlot();
    clearBattle(slot); // брошенный бой не продолжается
    const save = loadSlot(slot);
    save.lastEnemy = id;
    saveSlot(slot, save);
    enterGame(); // экран боя заменяет карту и начинает бой
  };
  if (!storyAllowEnemy(id)) return; // сюжет: сначала — враг из задания
  if (battle && !battle.over && battle.enemyId === id) { enterGame(); return; } // тот же враг — вернуться в бой
  if (battle && !battle.over) showConfirm(tr("ui.Бросить текущий бой?"), tr("ui.Бросить"), go);
  else go();
}
