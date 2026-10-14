// Идёт ли урок про хлам (после первой победы): hero.story.junk — 'loot' (нажать на хлам и продать) или 'cont' («Продолжить»).
function storyJunkActive() {
  const hero = loadSlot(getActiveSlot());
  const j = hero && hero.story && hero.story.junk;
  return j === 'loot' || j === 'cont';
}
