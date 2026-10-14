// Акт 4: сюжетное поручение «Каска для прораба» ещё висит на доске (не взято).
function storyHelmetOnBoard(hero) {
  return ((hero.quests && hero.quests.board) || []).some(q => q.uid === 'story-helmet');
}
