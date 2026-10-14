// Акты 2+: текущий шаг акта героя (шаги с невыполненным when пропускаются — сюжет сдвигается вперёд).
// Возвращает { act, step } или null (актов больше нет). prepare = true — выполнить подготовку акта (тогда героя
// ОБЯЗАТЕЛЬНО сохранить, иначе подготовка повторится). Меняет hero.story.
function storyCurrentStep(hero, prepare = false) {
  const st = storyState(hero);
  const act = STORY_ACTS[st.act - 1];
  if (!act || !act.steps) return null;
  if (typeof st.stage !== 'number') st.stage = 0; // 'wait' и т. п. из прошлых версий
  if (act.skip && st.stage === 0 && st.prep !== st.act && act.skip(hero)) { // акт не нужен этому герою (сумка уже есть) — молча пройден
    st.done = st.act; st.act++; st.stage = 0;
    return storyCurrentStep(hero, prepare);
  }
  if (prepare && act.prepare && st.prep !== st.act) { act.prepare(hero); st.prep = st.act; } // только там, где героя потом сохраняют
  while (st.stage < act.steps.length && act.steps[st.stage].when && !act.steps[st.stage].when(hero)) st.stage++;
  const step = act.steps[st.stage];
  return step ? { act, step } : null;
}
