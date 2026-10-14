// Сюжет: что показать на открытом экране по текущему шагу (hero.story.stage). Диалоги (начало и конец акта) —
// storyResume, стрелки до боя — здесь: журнал → «Карта врагов» → локация → враг. В учебном бою подсказки
// ведёт сам бой (tutorialStep). Ничего не подходит — подсказка сюжета прячется.
function storyCheck() {
  clearTimeout(storyCheck.t);
  storyCheck.t = setTimeout(() => {
    const box = document.getElementById('tutorial');
    const hide = () => { if (box.dataset.story && !tutorialActive()) hideTutorial(); };
    const screen = document.querySelector('.screen.active');
    const id = screen && screen.id;
    const slot = getActiveSlot();
    const hero = loadSlot(slot);
    if (!hero || ['menu', 'create', 'intro', 'characters', 'settings', 'bye'].includes(id)) { hide(); return; }
    if (tutorialActive()) return;
    const modal = document.querySelector('.modal.open');
    if (modal) { hide(); return; }
    const st = storyState(hero);
    if (st.act !== 1 || st.done >= 1) { hide(); return; }
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
      storyGuide(document.querySelector('#enemyList [data-enemy="' + target.enemy.id + '"]'), storyFill(g.toEnemy, hero));
      return;
    }
    hide();
  }, 250);
}
