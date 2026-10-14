// Акты 2+: что показать на открытом экране по текущему шагу (storyCurrentStep).
// dialog — разговор; goto — стрелка на переход (кнопка столбца меню или карточка бункера), пришли — дальше;
// ok — пояснение с «Понятно»; event — стрелка на нужное действие, дальше — по storyEvent; reward — конец акта.
function storyRunStep(hero, slot, screen, hide) {
  const id = screen && screen.id;
  const cur = storyCurrentStep(hero, true);
  saveSlot(slot, hero); // when/prepare могли сдвинуть сюжет
  if (!cur) { hide(); return; }
  if (id === 'game' && cur.step.screen !== 'game') { hide(); return; } // в бою — только шаги боя
  const { act, step } = cur;
  const st = storyState(hero);
  const f = storyFaction(hero);
  const advance = () => {
    const h = loadSlot(slot);
    storyState(h).stage++;
    saveSlot(slot, h);
    hideTutorial();
    storyCheck();
  };
  const cardScreen = step.cardScreen || 'bunker'; // карточка — в бункере или в лагере
  const nav = () => { // стрелка туда, где шаг выполняется
    if (step.card && id === cardScreen) {
      const sel = cardScreen === 'camp' ? '#campBody .campCard[data-card="' + step.card + '"] .campOpen'
        : '#bunkerBody .bunkerCard[data-card="' + step.card + '"] button';
      storyGuide(document.querySelector(sel), step.type === 'goto' ? storyFill(step.text, hero) : tr("ui.Нам сюда."));
      return;
    }
    const via = step.via || (step.card ? cardScreen : null);
    const btn = via && screen.querySelector('.sideMenu [data-act="' + via + '"]');
    if (btn) storyGuide(btn, step.type === 'goto' ? storyFill(step.text, hero) : tr("ui.Нам сюда."));
    else hide();
  };
  if (step.type === 'dialog') {
    const npc = step.who ? STORY_LOCALS[step.who] : STORY_NPCS[f];
    const lines = (Array.isArray(step.lines) ? step.lines : step.lines[f]).map(l => storyFill(l, hero));
    const ok = typeof step.ok === 'string' ? step.ok : step.ok[f];
    const first = st.stage === 0;
    showDialog(npc, lines, ok, () => {
      if (first) { const h = loadSlot(slot); storyAddActQuest(h, act); saveSlot(slot, h); }
      advance();
    });
    return;
  }
  if (step.type === 'reward') { storyFinishAct(); return; }
  if (step.type === 'open') { // открыть экран самим (например, журнал после взятия задания)
    const h = loadSlot(slot); storyState(h).stage++; saveSlot(slot, h);
    if (step.screen === 'journal') openJournal();
    return;
  }
  if (step.silent) { hide(); return; } // ждём события без подсказок (например, «приходи, когда победишь»)
  if (step.type === 'ok' && step.screen === 'game' && id !== 'game') { advance(); return; } // пояснение боя — бой уже кончился
  if (step.type === 'goto') {
    if (id === step.screen) { advance(); return; }
    nav();
    return;
  }
  if (id !== step.screen) { nav(); return; }
  if (step.modal && !document.getElementById(step.modal).classList.contains('open')) { // окно закрыли — открыть снова
    const back = [...document.querySelectorAll(step.backSel || 'none')].find(e => e.offsetParent !== null);
    if (back) storyGuide(back, tr("ui.Нажми ещё раз — окно закрылось.")); else hide();
    return;
  }
  if (step.mapTarget && id === 'map') { // цель на карте: сначала локация, потом враг
    const t = step.mapTarget(hero);
    const el = mapZoneId !== t.zone.id ? document.querySelector('#zoneList [data-zone="' + t.zone.id + '"]')
      : document.querySelector('#enemyList [data-enemy="' + t.enemy.id + '"]');
    if (el) { el.scrollIntoView({ block: 'nearest' }); storyGuide(el, storyFill(step.text, hero), step.type === 'ok' ? advance : null); } else hide();
    return;
  }
  // sel — селектор или список селекторов по приоритету: берётся первый видимый элемент
  const sels = Array.isArray(step.sel) ? step.sel : [step.sel];
  let el = null;
  for (const s of sels) { el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null); if (el) break; }
  if (!el) { hide(); return; }
  el.scrollIntoView({ block: 'center', inline: 'nearest' }); // цель могла быть за краем прокрутки
  setTimeout(() => {
    if (step.type === 'ok') storyGuide(el, storyFill(step.text, hero), advance);
    else storyGuide(el, storyFill(step.text, hero)); // event — ждём действия
  }, 120);
}
