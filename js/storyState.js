// Сюжет героя: hero.story = { act — номер текущего акта (1…), stage — шаг акта, done — сколько актов пройдено,
// won — исход сюжетного боя }. Нет записи (новый или старый герой) — сюжет с самого начала: всё закрыто.
function storyState(hero) {
  if (!hero) return { act: 1, stage: 'intro', done: 0 };
  if (!hero.story) hero.story = { act: 1, stage: 'intro', done: 0 };
  return hero.story;
}
