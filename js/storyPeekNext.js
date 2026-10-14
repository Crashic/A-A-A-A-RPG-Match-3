// Следующий за текущим шаг акта (с учётом when) — без изменения героя.
function storyPeekNext(hero) {
  const st = storyState(hero);
  const act = STORY_ACTS[st.act - 1];
  if (!act || !act.steps) return null;
  let i = st.stage + 1;
  while (i < act.steps.length && act.steps[i].when && !act.steps[i].when(hero)) i++;
  return act.steps[i] || null;
}
