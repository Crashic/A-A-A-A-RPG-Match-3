// Подсказка сюжета со стрелкой (та же разметка #tutorial, showTutorial): el — цель, text — пояснение.
// onOk задан — кнопка «Понятно», иначе подсказка ждёт действия игрока. «Скрыть обучение» у сюжета нет.
function storyGuide(el, text, onOk) {
  const box = document.getElementById('tutorial');
  if (!el) { hideTutorial(); return; }
  box.dataset.story = '1';
  storyGuide.el = el; // цель: только на неё можно нажать (setupStoryBlock)
  storyGuide.onOk = onOk || null;
  box.querySelector('.tutHide').hidden = true;
  showTutorial({ id: 'story', text, auto: !onOk }, el);
}
