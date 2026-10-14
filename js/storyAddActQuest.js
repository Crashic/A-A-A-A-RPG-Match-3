// Акты 2+: сюжетное задание акта в журнале (сдаётся само, в конце акта).
function storyAddActQuest(hero, act) {
  const f = storyFaction(hero);
  const npc = STORY_NPCS[f];
  const first = act.steps.find(s => s.type === 'dialog');
  const lines = first ? (Array.isArray(first.lines) ? first.lines : first.lines[f]) : [];
  hero.quests = hero.quests || {};
  hero.quests.active = (hero.quests.active || []).filter(q => q.uid !== 'story-' + act.id);
  hero.quests.active.unshift({
    uid: 'story-' + act.id, cat: 'story', type: 'story', story: act.id,
    giverName: npc.name, giverWho: npc.who,
    title: act.title, text: storyFill(lines[0] || '', hero), goal: tr("ui.Выполнить, что велено"),
    need: 1, have: 0, level: hero.level,
    reward: { xp: 0, tape: act.reward.tape || 0, item: act.reward.item || null }
  });
}
