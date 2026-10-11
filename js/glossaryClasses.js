// Глоссарий · Классы (js/classes.js): описание и у каких рас есть, с бонусом.
function glossaryClasses() {
  return CLASSES.map(c => {
    const races = RACES.filter(r => r.classes[c.id]).map(r => r.name + ': ' + r.classes[c.id].text);
    return glossaryEntry(iconTile(c.icon, c.color), c.name, '', [
      c.description,
      CLASS_SKILLS[c.id] ? 'Боевой навык «' + CLASS_SKILLS[c.id].name + '» (' + skillCostText(CLASS_SKILLS[c.id]) + '): ' + CLASS_SKILLS[c.id].text : null,
      ['list', 'Есть у: ' + races.join(' · ')]]);
  });
}
