// Действие игрока для сюжета (надел, продал, взял задание, начал бой / победил — data: id врага…): если текущий шаг его ждёт — сюжет идёт дальше.
// Вызывать после того, как функция сохранила героя.
function storyEvent(name, data) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const st = storyState(hero);
  if (name === 'sell' && st.junk === 'loot') { st.junk = 'cont'; saveSlot(slot, hero); setTimeout(storyJunkStep, 300); return; } // урок про хлам
  if (st.act < 2) return;
  let cur = storyCurrentStep(hero, true);
  // пояснение внутри боя ещё висит, а бой уже кончился — пропустить его
  if (cur && cur.step.type === 'ok' && cur.step.screen === 'game' && name !== 'battle') { st.stage++; cur = storyCurrentStep(hero, true); }
  const s = cur && cur.step;
  if (!s || s.type !== 'event' || s.event !== name || (s.test && !s.test(hero, data)) ||
    (name === 'battle' && s.mapTarget && s.mapTarget(hero).enemy.id !== data)) { saveSlot(slot, hero); return; }
  st.stage++;
  saveSlot(slot, hero);
  hideTutorial();
  setTimeout(tutorialCheck, 300); // окно вещи успеет закрыться
}
