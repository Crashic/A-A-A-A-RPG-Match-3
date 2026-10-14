// Конец боя (finishBattle): если это сюжетная цель акта 1 — задание выполнено (и при победе, и при поражении),
// дальше — разговор с NPC после окна итогов (storyResume, stage 'after').
function storyBattleEnd(hero, won, enemyId) {
  const st = storyState(hero);
  const target = storyTarget(hero);
  if (st.act !== 1 || st.done >= 1 || !target || target.enemy.id !== enemyId) return;
  if (!['battle', 'toEnemy', 'toZone', 'toMap', 'journal'].includes(st.stage)) return;
  st.stage = 'after';
  st.won = !!won;
  const q = ((hero.quests && hero.quests.active) || []).find(x => x.uid === 'story-act1');
  if (q) q.have = q.need;
}
