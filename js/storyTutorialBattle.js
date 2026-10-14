// Сюжет: этот бой — учебный (акт 1, герой пошёл на свою цель)?
function storyTutorialBattle(hero, enemyId) {
  const st = storyState(hero);
  const target = storyTarget(hero);
  return st.act === 1 && st.stage === 'battle' && !!target && target.enemy.id === enemyId;
}
