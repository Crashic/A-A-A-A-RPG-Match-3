// Закрывает окно итогов боя.
function closeBattleResult() {
  setTimeout(tutorialCheck, 50); // обучение: после итогов — подсказки по меню справа
  document.getElementById('battleResult').classList.remove('open');
}
