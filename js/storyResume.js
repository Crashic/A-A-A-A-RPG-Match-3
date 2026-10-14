// Сюжет: диалоги акта 1. stage 'intro' — NPC ругает за опоздание и даёт задание (оно появляется в журнале);
// stage 'after' — после сюжетного боя NPC хвалит или утешает, выдаёт награду, акт пройден.
function storyResume() {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero || document.getElementById('storyDialog').classList.contains('open')) return;
  const st = storyState(hero);
  if (st.act !== 1 || st.done >= 1) return;
  const f = storyFaction(hero);
  const npc = STORY_NPCS[f];
  const A = STORY_ACT1;
  if (st.stage === 'intro') {
    if (!document.getElementById('journal').classList.contains('active')) openJournal();
    showDialog(npc, A.intro[f].map(l => storyFill(l, hero)), A.introOk[f], () => {
      const h = loadSlot(slot);
      storyAddQuest(h);
      storyState(h).stage = 'journal';
      saveSlot(slot, h);
      openJournal();
    });
    return;
  }
  if (st.stage === 'after') {
    const lines = (st.won ? A.win : A.lose)[f].map(l => storyFill(l, hero));
    showDialog(npc, lines, A.endOk[f], () => storyFinishAct1());
  }
}
