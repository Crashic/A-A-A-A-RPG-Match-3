// Действие игрока для сюжета (надел, продал, взял задание…): если текущий шаг его ждёт — сюжет идёт дальше.
// Вызывать после того, как функция сохранила героя.
function storyEvent(name) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const st = storyState(hero);
  if (st.act < 2) return;
  const cur = storyCurrentStep(hero);
  if (!cur || cur.step.type !== 'event' || cur.step.event !== name) { saveSlot(slot, hero); return; }
  st.stage++;
  saveSlot(slot, hero);
  hideTutorial();
  setTimeout(tutorialCheck, 300); // окно вещи успеет закрыться
}
