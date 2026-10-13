// Глоссарий · Навыки (js/skills.js): по расам и классам — тип, цена, что делает, оттенок расы.
// Боевые навыки классов (js/classSkills.js) — в начале раздела, по одному на класс.
// Адаптированные классы Прессы берут навыки расы-источника (PRESS_SKILL_SOURCE).
function glossarySkills() {
  const out = [glossaryHeading(tr("ui.Боевые навыки классов"))];
  for (const cls of CLASSES) {
    const s = CLASS_SKILLS[cls.id];
    if (s) out.push(glossaryEntry(gemMiniIcon(Object.keys(s.cost)[0]), s.name,
      cls.name + ' · ' + skillCostText(s), [s.text, ['lore', s.lore]]));
  }
  for (const race of RACES) {
    out.push(glossaryHeading(race.name));
    for (const classId of Object.keys(race.classes)) {
      const cls = findById(CLASSES, classId);
      const skills = heroSkills({ raceId: race.id, classId });
      const from = race.id === 'press' && PRESS_SKILL_SOURCE[classId] ? findById(RACES, PRESS_SKILL_SOURCE[classId]) : null;
      for (const s of skills.filter(s => !s.classSkill)) { // боевые навыки классов — в «Классах»
        const type = s.type === 'active'
          ? tr("ui.Активный · ") + skillCostText(s) + (s.once ? tr("ui. · раз за бой") : '')
          : tr("ui.Пассивный");
        out.push(glossaryEntry(iconTile(cls.icon, cls.color), s.name,
          cls.name + (from ? tr("ui. (навыки: ") + from.name + ')' : '') + ' · ' + type, [s.text, ['lore', s.lore]]));
      }
    }
  }
  return out;
}
