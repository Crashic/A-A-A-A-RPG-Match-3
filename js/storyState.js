// Версия нумерации актов (растёт, когда акт вставляют в середину; storyState переводит старые сохранения).
const STORY_VERSION = 2;
// Сюжет героя: hero.story = { act — номер текущего акта (1…), stage — шаг акта, done — сколько актов пройдено,
// won — исход сюжетного боя }. Нет записи (новый или старый герой) — сюжет с самого начала: всё закрыто.
function storyState(hero) {
  if (!hero) return { act: 1, stage: 'intro', done: 0 };
  if (!hero.story) hero.story = { act: 1, stage: 'intro', done: 0, v: STORY_VERSION };
  const st = hero.story;
  if ((st.v || 1) < 2) { // v2: после акта 1 вставлен акт «Тара» — номера актов 2+ сдвигаются на один
    if (st.act >= 2) { st.act++; if (st.done >= 1) st.done++; if (st.prep >= 2) st.prep++; }
    st.v = 2;
  }
  return st;
}
