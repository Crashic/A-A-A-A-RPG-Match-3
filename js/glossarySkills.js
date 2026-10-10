// Глоссарий · Навыки (js/skills.js): по расам и классам — тип, цена, что делает, оттенок расы.
// Адаптированные классы Прессы берут навыки расы-источника (PRESS_SKILL_SOURCE).
function glossarySkills() {
  const out = [];
  for (const race of RACES) {
    out.push(glossaryHeading(race.name));
    for (const classId of Object.keys(race.classes)) {
      const cls = findById(CLASSES, classId);
      const skills = heroSkills({ raceId: race.id, classId });
      const from = race.id === 'press' && PRESS_SKILL_SOURCE[classId] ? findById(RACES, PRESS_SKILL_SOURCE[classId]) : null;
      for (const s of skills) {
        const type = s.type === 'active'
          ? 'Активный · ' + skillCostText(s) + (s.once ? ' · раз за бой' : '')
          : 'Пассивный';
        out.push(glossaryEntry(iconTile(cls.icon, cls.color), s.name,
          cls.name + (from ? ' (навыки: ' + from.name + ')' : '') + ' · ' + type, [s.text, ['lore', s.lore]]));
      }
    }
  }
  return out;
}
