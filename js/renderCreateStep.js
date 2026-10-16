// Рисует текущий экран создания: «Сервер» или «Анкета-плакат» (раса, пол, класс и имя на одном экране — renderHeroStep).
function renderCreateStep() {
  const hero = creation.step !== 'server';
  document.getElementById('create').classList.toggle('heroStep', hero);
  document.getElementById('createPoster').hidden = !hero;
  if (hero) renderHeroStep();
  else renderServerStep();
  tutorialCheck();
}
