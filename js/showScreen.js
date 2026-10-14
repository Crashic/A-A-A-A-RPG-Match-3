// Переключает экран: menu, characters, create, settings, game, map, glossary, character, bunker, shop, quests, bye.
// Уход из меню записывается в историю, чтобы кнопка «Назад» на телефоне возвращала в меню.
function showScreen(id, push = true) {
  hideTip();
  if (bagSel && bagSel.screen !== id) bagSel = null; // выделение в сумке — только на своём экране
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  if (id !== 'menu' && push) navPush(id); // история: игровые экраны — поверх игрового меню (navPush)
  window.scrollTo(0, 0);
  hideTutorial();
  updateNotifyBadges(); // «!» на Заданиях и Персонаже
  tutorialCheck(); // обучение: подсказка для этого экрана
}
