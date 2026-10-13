// Показывает подходящий шаг обучения на открытом экране (если обучение включено — settings.tutorialAll
// и у персонажа не выключено): первый не просмотренный шаг, у которого видна цель. Иначе прячет подсказку.
function tutorialCheck() {
  clearTimeout(tutorialCheck.t);
  tutorialCheck.t = setTimeout(() => {
    const screen = document.querySelector('.screen.active');
    const id = screen && screen.id;
    const onCreate = id === 'create';
    const hero = onCreate ? null : loadSlot(getActiveSlot());
    const st = tutorialState(hero);
    if (!settings.tutorialAll || st.off || (!onCreate && !hero) || document.querySelector('.modal.open')) { hideTutorial(); return; }
    const visible = el => el && el.offsetParent !== null && el.getBoundingClientRect().width > 0;
    for (const s of TUTORIAL_STEPS) {
      if (s.screen !== id || (!s.auto && st.seen[s.id]) || (s.when && !s.when())) continue;
      const el = [...document.querySelectorAll(s.sel)].find(visible);
      if (!el) continue;
      showTutorial(s, el);
      return;
    }
    hideTutorial();
  }, 250);
}
