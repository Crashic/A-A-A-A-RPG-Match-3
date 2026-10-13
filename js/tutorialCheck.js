// Показывает подходящий шаг обучения на открытом экране (если обучение включено — settings.tutorialAll
// и у персонажа не выключено): первый не просмотренный шаг, у которого видна цель (если открыто окно —
// только шаги с modal этого окна). Иначе прячет подсказку.
function tutorialCheck() {
  clearTimeout(tutorialCheck.t);
  tutorialCheck.t = setTimeout(() => {
    const screen = document.querySelector('.screen.active');
    const id = screen && screen.id;
    const onCreate = id === 'create';
    const hero = onCreate ? null : loadSlot(getActiveSlot());
    const st = tutorialState(hero);
    const modal = document.querySelector('.modal.open');
    if (!settings.tutorialAll || st.off || (!onCreate && !hero)) { hideTutorial(); return; }
    const visible = el => el && el.offsetParent !== null && el.getBoundingClientRect().width > 0;
    for (const s of TUTORIAL_STEPS) {
      if (s.screen !== id || (!s.auto && st.seen[s.id]) || (s.when && !s.when())) continue;
      if (modal ? s.modal !== modal.id : s.modal) continue; // пока открыто окно — только его шаги
      const el = [...document.querySelectorAll(s.sel)].find(visible);
      if (!el) continue;
      showTutorial(s, el);
      return;
    }
    hideTutorial();
  }, 250);
}
