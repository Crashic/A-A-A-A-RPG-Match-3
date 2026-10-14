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
    if (fromBattle) goBack(); // назад на экран боя — renderScreen('game') начнёт бой с выбранным врагом
    else enterGame(true);     // карта после боя: экран боя заменяет карту и начинает бой
  };
  if (!storyAllowEnemy(id)) return; // сюжет: сначала — враг из задания
  const fromBattle = !!battle;
  if (battle && !battle.over && battle.enemyId === id) { goBack(); return; } // тот же враг — вернуться в бой
  if (battle && !battle.over) showConfirm(tr("ui.Бросить текущий бой?"), tr("ui.Бросить"), go);
  else go();
}
