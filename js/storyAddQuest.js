// Акт 1: сюжетное задание в журнале (категория 'story', сдаётся само — после боя, в диалоге).
function storyAddQuest(hero) {
  const f = storyFaction(hero);
  const npc = STORY_NPCS[f];
  const target = storyTarget(hero);
  hero.quests = hero.quests || {};
  hero.quests.active = (hero.quests.active || []).filter(q => q.uid !== 'story-act1');
  hero.quests.active.unshift({
    uid: 'story-act1', cat: 'story', type: 'story', story: 'act1',
    giverName: npc.name, giverWho: npc.who,
    title: STORY_ACT1.title, text: STORY_ACT1.questText[f],
    goal: tr("ui.Разобраться с: ") + target.enemy.name + ' (' + target.zone.name + ')',
    need: 1, have: 0, level: hero.level,
    reward: { xp: 0, tape: STORY_ACT1.reward.tape, item: STORY_ACT1.reward.item }
  });
  journalSel = 'story-act1';
}
