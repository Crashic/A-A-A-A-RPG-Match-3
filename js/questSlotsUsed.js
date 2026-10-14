// Занятые слоты категории: взятые задания + заблокированные после отказа. Сюжетные (story) слотов не занимают — их можно брать сколько угодно.
function questSlotsUsed(hero, cat) {
  return ((hero.quests && hero.quests.active) || []).filter(x => x.cat === cat && !x.story).length + questLocks(hero, cat).length;
}
