// Переключает экран: menu, characters, create, settings, game, map, glossary, character, bunker, shop, bye.
// Уход из меню записывается в историю, чтобы кнопка «Назад» на телефоне возвращала в меню.
function showScreen(id, push = true) {
  hideTip();
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  if (id !== 'menu' && push) history.pushState({ screen: id }, '');
  window.scrollTo(0, 0);
}
