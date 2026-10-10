// Навыки персонажа по его расе и классу (у адаптированных классов Прессы — навыки расы-источника).
function heroSkills(hero) {
  if (!hero) return [];
  const race = hero.raceId === 'press' && PRESS_SKILL_SOURCE[hero.classId] ? PRESS_SKILL_SOURCE[hero.classId] : hero.raceId;
  return SKILLS[race + ':' + hero.classId] || [];
}
