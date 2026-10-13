// Переключает экран: menu, characters, create, settings, game, map, glossary, character, bunker, shop, quests, bye.
// Уход из меню записывается в историю, чтобы кнопка «Назад» на телефоне возвращала в меню.
function showScreen(id, push = true) {
  hideTip();
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  if (id !== 'menu' && push) history.pushState({ screen: id, depth: navDepth() + 1 }, ''); // depth — шагов от меню (goHome)
  window.scrollTo(0, 0);
  hideTutorial();
  tutorialCheck(); // обучение: подсказка для этого экрана
}
