// «Домой»: в лагерь, если он открыт, иначе — на карту врагов.
function goHomeBase() {
  closeBattleMenu();
  const hero = loadSlot(getActiveSlot());
  const st = storyState(hero);
  if (hero && st.act === 1 && st.done < 1 && ['intro', 'journal'].includes(st.stage)) { openJournal(); return; } // сюжет: разговор и журнал
  if (campUnlocked() && storyFeatureOpen('camp', hero)) openCamp(); else openMap();
}
