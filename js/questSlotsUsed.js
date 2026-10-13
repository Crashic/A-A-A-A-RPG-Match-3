// Занятые слоты категории: взятые задания + заблокированные после отказа.
function questSlotsUsed(hero, cat) {
  return ((hero.quests && hero.quests.active) || []).filter(x => x.cat === cat).length + questLocks(hero, cat).length;
}
