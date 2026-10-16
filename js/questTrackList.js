// Задания для трекера в бою: сначала сюжетные, потом остальные взятые; у «Собрать фишки» к прогрессу
// прибавлено собранное в текущем бою. Возвращает [{ uid, title, type, have, baseHave, need, cat }].
function questTrackList() {
  const hero = battle && battle.save ? battle.save : loadSlot(getActiveSlot());
  const list = (hero && hero.quests && hero.quests.active) || [];
  const gained = (battle && battle.gained && battle.gained.gems) || {};
  return list.slice().sort((a, b) => (b.cat === 'story') - (a.cat === 'story')).map(q => {
    const extra = q.type === 'gems' ? (gained[q.gem] || 0) : 0;
    return { uid: q.uid, title: q.title, type: q.type, cat: q.cat, need: q.need, baseHave: q.have, have: Math.min(q.need, q.have + extra) };
  });
}
