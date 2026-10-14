// После каждого боя (finishBattle) поручения на доске стареют на один бой; у кого срок вышел — их «забрал кто-то другой»,
// на их место questBoard вешает новые. Возвращает, сколько сняли.
function questBoardTick(hero) {
  const q = hero.quests;
  if (!q || !q.board) return 0;
  for (const x of q.board) if (!x.story) x.left = (x.left == null ? questLife(x) : x.left) - 1;
  const before = q.board.length;
  q.board = q.board.filter(x => x.story || x.left > 0); // сюжетное поручение не сгорает
  questBoard(hero);
  return before - q.board.length;
}
