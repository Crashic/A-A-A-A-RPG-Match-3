// Герой отказался от подсказок сюжета («Пропустить обучение»): стрелок нет, задания читает сам.
function storyNoGuide() {
  const hero = loadSlot(getActiveSlot());
  return !!(hero && hero.story && hero.story.noGuide);
}
