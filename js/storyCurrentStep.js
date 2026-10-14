// Акты 2+: текущий шаг акта героя (шаги с невыполненным when пропускаются — сюжет сдвигается вперёд).
// Возвращает { act, step } или null (актов больше нет). Меняет hero.story, сохранять — вызывающему.
function storyCurrentStep(hero) {
  const st = storyState(hero);
  const act = STORY_ACTS[st.act - 1];
  if (!act || !act.steps) return null;
  if (typeof st.stage !== 'number') st.stage = 0; // 'wait' и т. п. из прошлых версий
  if (act.prepare && st.prep !== st.act) { act.prepare(hero); st.prep = st.act; }
  while (st.stage < act.steps.length && act.steps[st.stage].when && !act.steps[st.stage].when(hero)) st.stage++;
  const step = act.steps[st.stage];
  return step ? { act, step } : null;
}
