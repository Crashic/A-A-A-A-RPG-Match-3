// Классы Прессы по фракциям: две колонки (Совет Управляющих | Союз Вольных) и нейтральный Хронист.
// Возвращает { columns: [{ faction, classes }], neutral: [classes] }.
function pressColumns() {
  const classes = raceClasses('press');
  const of = side => CLASSES.filter(c => classes[c.id] && classes[c.id].side === side);
  return {
    columns: FACTIONS.filter(f => f.id !== 'press').map(f => ({ faction: f, classes: of(f.id) })),
    neutral: of(null)
  };
}
