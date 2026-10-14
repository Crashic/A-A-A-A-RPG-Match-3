// Ждёт ли героя разговор с NPC после сюжетного боя.
function storyAfterPending() {
  const hero = loadSlot(getActiveSlot());
  const st = storyState(hero);
  return !!hero && st.act === 1 && st.done < 1 && st.stage === 'after';
}
