// Рисует текущий экран создания: «Сервер и режим» (renderServerStep) или «Анкета-плакат» (раса, пол, класс и имя — renderHeroStep).
// Оба шага — одна раскладка: слева выбор, по центру плакат #createPoster, справа бумажная анкета.
function renderCreateStep() {
  document.getElementById('create').classList.add('heroStep');
  const poster = document.getElementById('createPoster');
  poster.hidden = false;
  poster.className = '';
  if (creation.step === 'server') renderServerStep();
  else renderHeroStep();
  tutorialCheck();
}
