// Останавливает заставку без продолжения (например, при выходе кнопкой «Назад»).
function stopIntro() {
  if (!intro) return;
  clearTimeout(intro.timer);
  intro = null;
  document.getElementById('introCrawl').classList.remove('run');
}
