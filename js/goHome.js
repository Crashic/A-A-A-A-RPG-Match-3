// В главное меню: идём назад по истории, пока не дойдём до записи меню (popstate с homeBound листает дальше),
// чтобы «Назад» телефона потом не возвращал в игру. Запасной путь (история кончилась раньше меню) срабатывает,
// только если шагов назад не было 600 мс — таймер перезапускается на каждом шаге (homeFallback).
let homeBound = false;
function goHome() {
  closeBattleMenu();
  closeBattleResult();
  hideTip();
  const st = history.state;
  if (!st || !st.screen || st.screen === 'menu') { battle = null; renderMenu(); showScreen('menu', false); return; }
  homeBound = true;
  homeFallback();
  history.back();
}
function homeFallback() {
  clearTimeout(homeFallback.t);
  homeFallback.t = setTimeout(() => {
    if (!homeBound) return;
    homeBound = false;
    history.replaceState({ screen: 'menu', depth: 0 }, '');
    battle = null;
    renderScreen('menu');
    showScreen('menu', false);
  }, 600);
}
