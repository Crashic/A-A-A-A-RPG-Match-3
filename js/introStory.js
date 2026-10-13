// История для заставки персонажа hero: { episode, title, paragraphs } из INTRO_STORIES.
// Адаптированные классы Прессы берут историю расы-источника; если истории нет — общая.
function introStory(hero) {
  const race = findById(RACES, hero.raceId);
  const cls = findById(CLASSES, hero.classId);
  const source = hero.raceId === 'press' && PRESS_SKILL_SOURCE[hero.classId] ? PRESS_SKILL_SOURCE[hero.classId] : hero.raceId;
  const paragraphs = INTRO_STORIES[source + ':' + hero.classId] ||
    [tr("ui.Ещё один выживший вылез из бункера за тушёнкой. Тушёнка, как обычно, против.")];
  return {
    episode: (race ? race.name : '') + (cls ? ' · ' + cls.name : ''),
    title: hero.name || tr("ui.Выживший"),
    paragraphs
  };
}
