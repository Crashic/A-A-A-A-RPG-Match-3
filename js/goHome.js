// В главное меню: одним прыжком назад по истории ровно до меню (depth — сколько экранов открыто поверх него),
// без промежуточных экранов. Если истории нет — просто показывает меню.
function goHome() {
  closeBattleMenu();
  closeBattleResult();
  hideTip();
  const steps = navDepth();
  if (steps > 0) history.go(-steps);
  else { renderMenu(); showScreen('menu', false); }
}
