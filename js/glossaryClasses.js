// Глоссарий · Классы (js/classes.js): описание и у каких рас есть, с бонусом.
function glossaryClasses() {
  return CLASSES.map(c => {
    const races = RACES.filter(r => r.classes[c.id]).map(r => r.name + ': ' + r.classes[c.id].text);
    return glossaryEntry(iconTile(c.icon, c.color), c.name, '', [
      c.description, ['list', 'Есть у: ' + races.join(' · ')]]);
  });
}
