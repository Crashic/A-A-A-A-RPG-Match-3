// Прячет подсказку обучения.
function hideTutorial() {
  const box = document.getElementById('tutorial');
  if (box) { box.hidden = true; delete box.dataset.story; }
  storyGuide.el = null;
}
