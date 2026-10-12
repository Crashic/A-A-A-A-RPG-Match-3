// Действие пункта столбца меню (SIDE_MENU): переход на экран или окно.
function sideMenuAction(act) {
  closeBattleMenu();
  if (act === 'bunker') openBunker();
  else if (act === 'map') openMap();
  else if (act === 'char') openCharacter();
  else if (act === 'glossary') openGlossary();
  else if (act === 'legend') openGemLegend();
  else if (act === 'cheat') openCheat();
  else if (act === 'home') goHome();
}
