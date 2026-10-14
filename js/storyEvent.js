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
  // нажали на цель пояснения «Понятно» (врага, «Открыть»…) — пояснение пропускается, если следующий шаг ждёт именно это
  if (cur && cur.step.type === 'ok') {
    const nx = storyPeekNext(hero);
    if (nx && nx.type === 'event' && nx.event === name) { st.stage++; cur = storyCurrentStep(hero, true); }
  }
  // «Пропустить обучение»: стрелок нет, игрок мог сделать нужное раньше, чем сюжет до этого дошёл — ищем шаг впереди
  if (cur && st.noGuide && !(cur.step.type === 'event' && cur.step.event === name && (!cur.step.test || cur.step.test(hero, data)))) {
    const steps = cur.act.steps;
    for (let i = st.stage + 1; i < steps.length; i++) {
      const s2 = steps[i];
      if (s2.type === 'event' && s2.event === name && (!s2.test || s2.test(hero, data))) { st.stage = i; cur = storyCurrentStep(hero, true); break; }
    }
  }
  const s = cur && cur.step;
  if (!s || s.type !== 'event' || s.event !== name || (s.test && !s.test(hero, data)) ||
    (name === 'battle' && s.mapTarget && s.mapTarget(hero).enemy.id !== data)) { saveSlot(slot, hero); return; }
  st.stage++;
  saveSlot(slot, hero);
  hideTutorial();
  setTimeout(tutorialCheck, 300); // окно вещи успеет закрыться
}
