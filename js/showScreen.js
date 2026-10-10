// Переключает экран: menu, profile, settings, game.
// Уход из меню записывается в историю, чтобы кнопка «Назад» на телефоне возвращала в меню.
function showScreen(id, push = true) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  if (id !== 'menu' && push) history.pushState({ screen: id }, '');
  window.scrollTo(0, 0);
}
