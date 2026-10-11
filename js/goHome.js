// В главное меню из карты или боя: шаг назад по истории до меню
// (из боя: меню → бой → карта — два шага; карта после боя: меню → карта — один).
function goHome() {
  const steps = history.state && history.state.screen === 'map' && battle && !battle.over ? 2 : 1;
  closeBattleResult();
  hideTip();
  history.go(-steps);
}
