// Подсказка сюжета со стрелкой (та же разметка #tutorial, showTutorial): el — цель, text — пояснение.
// onOk задан — кнопка «Понятно», иначе подсказка ждёт действия игрока. «Пропустить обучение» — storySkipGuide.
function storyGuide(el, text, onOk) {
  const box = document.getElementById('tutorial');
  if (!el) { hideTutorial(); return; }
  if (storyNoGuide()) { // «Пропустить обучение»: стрелок нет, пояснения проходят сами
    hideTutorial();
    if (onOk) setTimeout(onOk, 0);
    return;
  }
  box.dataset.story = '1';
  storyGuide.el = el; // цель: только на неё можно нажать (setupStoryBlock)
  storyGuide.onOk = onOk || null;
  const skip = box.querySelector('.tutHide');
  skip.hidden = false;
  skip.textContent = tr("ui.Пропустить обучение");
  const hero = loadSlot(getActiveSlot());
  const who = box.querySelector('.tutWho');
  if (who) who.textContent = hero ? STORY_NPCS[storyFaction(hero)].name : '';
  showTutorial({ id: 'story', text, auto: !onOk }, el);
}
