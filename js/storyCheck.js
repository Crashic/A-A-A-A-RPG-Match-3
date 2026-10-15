// Сюжет: что показать на открытом экране по текущему шагу (hero.story.stage). Диалоги (начало и конец акта) —
// storyResume, стрелки до боя — здесь: журнал → «Карта врагов» → локация → враг. В учебном бою подсказки
// ведёт сам бой (tutorialStep). Ничего не подходит — подсказка сюжета прячется.
const st0 = hero => { const s = storyState(hero); return s.act >= 2 && s.done >= 1; }; // идут акты 2+
function storyCheck() {
  clearTimeout(storyCheck.t);
  storyCheck.t = setTimeout(() => {
    const box = document.getElementById('tutorial');
    let hero0 = null;
    const hide = () => { // сюжету показывать нечего — может, есть подсказка «увидел новое»
      if (box.dataset.story && !tutorialActive()) hideTutorial();
      if (hero0 && !document.querySelector('.modal.open')) hintCheck(id, hero0);
    };
    const screen = document.querySelector('.screen.active');
    const id = screen && screen.id;
    const slot = getActiveSlot();
    const hero = loadSlot(slot);
    hero0 = hero;
    if (!hero || ['menu', 'create', 'intro', 'characters', 'settings', 'bye'].includes(id)) { hide(); return; }
    if (tutorialActive()) return;
    const modal = document.querySelector('.modal.open');
    if (storyJunkActive()) { storyJunkStep(); return; } // урок про хлам в окне итогов
    const waitsModal = modal && st0(hero) && storyCurrentStep(hero) && storyCurrentStep(hero).step.modal === modal.id;
    if (modal && waitsModal) { storyRunStep(hero, slot, screen, hide); return; } // шаг внутри окна вещи
    if (modal) { hide(); clearTimeout(storyCheck.wait); storyCheck.wait = setTimeout(storyCheck, 150); return; } // окно закроют — проверим снова (часто, чтобы без паузы)
    const st = storyState(hero);
    if (st.act !== 1 || st.done >= 1) { storyRunStep(hero, slot, screen, hide); return; } // акты 2+
    if (st.stage === 'intro' || st.stage === 'after') { if (id !== 'game') storyResume(); return; }
    const g = STORY_ACT1.guide;
    const target = storyTarget(hero);
    const set = stage => { st.stage = stage; saveSlot(slot, hero); };
    if (st.stage === 'journal') {
      if (id !== 'journal') { set('toMap'); storyCheck(); return; }
      storyGuide(document.querySelector('#journalRight .questCard') || document.getElementById('journalRight'),
        storyFill(g.journal, hero), () => { set('toMap'); storyCheck(); });
      return;
    }
    if (st.stage === 'toMap' && id === 'map') set('toZone');
    if (st.stage === 'toMap') {
      storyGuide(screen.querySelector('.sideMenu [data-act="map"]'), storyFill(g.toMap, hero));
      return;
    }
    if (st.stage === 'toZone' || st.stage === 'toEnemy' || st.stage === 'battle') {
      if (id !== 'map') { storyGuide(screen.querySelector('.sideMenu [data-act="map"]'), storyFill(g.toMap, hero)); return; }
      if (st.stage === 'toZone' || mapZoneId !== target.zone.id) {
        storyGuide(document.querySelector('#zoneList [data-zone="' + target.zone.id + '"]'), storyFill(g.toZone, hero));
        return;
      }
      storyGuide(mapEnemyId === target.enemy.id ? document.getElementById('mapFight') // враг выбран — жми «В бой»
        : document.querySelector('#enemyList [data-enemy="' + target.enemy.id + '"]'), storyFill(g.toEnemy, hero));
      return;
    }
    hide();
  }, 30); // без заметной паузы: только дать экрану дорисоваться
}
