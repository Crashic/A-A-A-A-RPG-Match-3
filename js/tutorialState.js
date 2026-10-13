// Состояние обучения текущего персонажа: { off, seen: { id: true } } (hero.tutorial). Пока персонаж
// создаётся — creation.tutorial. Возвращает объект (без сохранения).
function tutorialState(hero) {
  if (!hero) return (creation && (creation.tutorial = creation.tutorial || { off: false, seen: {} })) || { off: true, seen: {} };
  hero.tutorial = hero.tutorial || { off: false, seen: {} };
  hero.tutorial.seen = hero.tutorial.seen || {};
  return hero.tutorial;
}
