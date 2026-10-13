// В главное меню: идём назад по истории, пока не дойдём до записи меню (popstate с homeBound листает дальше),
// чтобы «Назад» телефона потом не возвращал в игру. Если истории назад нет — через 400 мс просто показываем меню.
let homeBound = false;
function goHome() {
  closeBattleMenu();
  closeBattleResult();
  hideTip();
  const st = history.state;
  if (!st || !st.screen || st.screen === 'menu') { battle = null; renderMenu(); showScreen('menu', false); return; }
  homeBound = true;
  history.back();
  setTimeout(() => { // запасной путь: история кончилась раньше меню
    if (!homeBound) return;
    homeBound = false;
    history.replaceState({ screen: 'menu', depth: 0 }, '');
    renderScreen('menu');
    showScreen('menu', false);
  }, 400);
}
