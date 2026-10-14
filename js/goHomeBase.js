// «Домой» / «Продолжить»: в игровое меню (openHub); в самом начале сюжета — в журнал.
function goHomeBase() {
  closeBattleMenu();
  const hero = loadSlot(getActiveSlot());
  const st = storyState(hero);
  if (hero && st.act === 1 && st.done < 1 && ['intro', 'journal'].includes(st.stage)) { openJournal(); return; } // сюжет: разговор и журнал
  openHub();
}
