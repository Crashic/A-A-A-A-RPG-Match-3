// Акт 4: «Каска для прораба» взята и ещё не сдана.
function storyHelmetActive(hero) {
  return ((hero.quests && hero.quests.active) || []).some(q => q.uid === 'story-helmet');
}
