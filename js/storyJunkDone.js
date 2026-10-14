// Окно итогов закрыто — урок про хлам окончен (больше не повторяется).
function storyJunkDone() {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero || !hero.story || !storyJunkActive()) return;
  hero.story.junk = 'done';
  saveSlot(slot, hero);
  hideTutorial();
}
