// Блок над кнопкой «Продолжить»: текущий выбранный персонаж — имя, уровень, изолента, пол, раса, класс, фракция.
// Если в выбранной ячейке персонажа нет, блок скрыт.
function renderHeroCard() {
  const n = getActiveSlot();
  const hero = loadSlot(n);
  const card = document.getElementById('heroCard');
  card.hidden = !hero;
  if (!hero) return;
  document.getElementById('heroCardName').textContent = hero.name;
  document.getElementById('heroCardSlot').textContent = 'Ячейка ' + n;
  const rows = [
    ['Уровень', { name: hero.level + (hero.level < MAX_LEVEL ? ' (' + hero.xp + ' / ' + xpToNext(hero.level) + ')' : '') }],
    ['Изолента', { html: formatTape(hero.tape) }],
    ['Пол', findById(GENDERS, hero.genderId)],
    ['Раса', findById(RACES, hero.raceId)],
    ['Класс', findById(CLASSES, hero.classId)],
    ['Фракция', findById(FACTIONS, hero.factionId) || { name: 'Нейтралы' }]
  ];
  const list = document.getElementById('heroCardStats');
  list.innerHTML = '';
  for (const [label, item] of rows) {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    if (item && item.html) dd.innerHTML = item.html;
    else dd.textContent = item ? item.name : '—';
    list.append(dt, dd);
  }
}
